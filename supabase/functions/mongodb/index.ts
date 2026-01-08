import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MongoDBRequest {
  action: 'find' | 'findOne' | 'insertOne' | 'insertMany' | 'updateOne' | 'updateMany' | 'deleteOne' | 'deleteMany';
  collection: string;
  database?: string;
  filter?: Record<string, unknown>;
  document?: Record<string, unknown>;
  documents?: Record<string, unknown>[];
  update?: Record<string, unknown>;
  projection?: Record<string, unknown>;
  sort?: Record<string, unknown>;
  limit?: number;
  skip?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MONGODB_APP_ID = Deno.env.get('MONGODB_APP_ID');
    const MONGODB_API_KEY = Deno.env.get('MONGODB_API_KEY');

    if (!MONGODB_APP_ID || !MONGODB_API_KEY) {
      throw new Error('MongoDB credentials not configured');
    }

  const body: MongoDBRequest = await req.json();
    const { action, collection, database = 'Dairyflow', filter, document, documents, update, projection, sort, limit, skip } = body;

    if (!action || !collection) {
      throw new Error('Missing required fields: action and collection');
    }

    // MongoDB Data API endpoint
    const dataApiUrl = `https://data.mongodb-api.com/app/${MONGODB_APP_ID}/endpoint/data/v1/action/${action}`;

    const payload: Record<string, unknown> = {
      dataSource: 'ClusterDairy',
      database,
      collection,
    };

    // Add optional fields based on action
    if (filter) payload.filter = filter;
    if (document) payload.document = document;
    if (documents) payload.documents = documents;
    if (update) payload.update = update;
    if (projection) payload.projection = projection;
    if (sort) payload.sort = sort;
    if (limit) payload.limit = limit;
    if (skip) payload.skip = skip;

    const response = await fetch(dataApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MongoDB API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('MongoDB function error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
