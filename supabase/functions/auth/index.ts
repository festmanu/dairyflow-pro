import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AuthRequest {
  action: 'signup' | 'login' | 'logout' | 'verify';
  email?: string;
  password?: string;
  name?: string;
  token?: string;
}

// Simple password hashing for demo - in production use proper hashing library
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'dairy_farm_salt_2024');
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a simple JWT-like token
function generateToken(userId: string, email: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(`${encodedHeader}.${encodedPayload}.secret`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify token
function verifyToken(token: string): { valid: boolean; payload?: { sub: string; email: string } } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp < now) return { valid: false };
    
    return { valid: true, payload: { sub: payload.sub, email: payload.email } };
  } catch {
    return { valid: false };
  }
}

async function callMongoDBAPI(appId: string, apiKey: string, action: string, payload: Record<string, unknown>) {
  const dataApiUrl = `https://data.mongodb-api.com/app/${appId}/endpoint/data/v1/action/${action}`;
  
  const response = await fetch(dataApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      dataSource: 'ClusterDairy',
      database: 'Dairyflow',
      collection: 'users',
      ...payload,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MongoDB API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MONGODB_APP_ID = Deno.env.get('MONGODB_APP_ID');
    const MONGODB_API_KEY = Deno.env.get('MONGODB_API_KEY');

    if (!MONGODB_APP_ID || !MONGODB_API_KEY) {
      throw new Error('MongoDB credentials not configured');
    }

    const body: AuthRequest = await req.json();
    const { action, email, password, name, token } = body;

    switch (action) {
      case 'signup': {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // Check if user exists
        const existingUser = await callMongoDBAPI(MONGODB_APP_ID, MONGODB_API_KEY, 'findOne', {
          filter: { email: email.toLowerCase() },
        });

        if (existingUser.document) {
          throw new Error('User already exists with this email');
        }

        // Create new user
        const hashedPassword = await hashPassword(password);
        const userId = crypto.randomUUID();
        
        await callMongoDBAPI(MONGODB_APP_ID, MONGODB_API_KEY, 'insertOne', {
          document: {
            _id: userId,
            email: email.toLowerCase(),
            password: hashedPassword,
            name: name || email.split('@')[0],
            createdAt: new Date().toISOString(),
            role: 'farmer',
          },
        });

        const authToken = generateToken(userId, email);

        return new Response(JSON.stringify({
          success: true,
          user: { id: userId, email, name: name || email.split('@')[0], role: 'farmer' },
          token: authToken,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'login': {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const hashedPassword = await hashPassword(password);
        
        const result = await callMongoDBAPI(MONGODB_APP_ID, MONGODB_API_KEY, 'findOne', {
          filter: { 
            email: email.toLowerCase(),
            password: hashedPassword,
          },
        });

        if (!result.document) {
          throw new Error('Invalid email or password');
        }

        const user = result.document;
        const authToken = generateToken(user._id, user.email);

        return new Response(JSON.stringify({
          success: true,
          user: { id: user._id, email: user.email, name: user.name, role: user.role },
          token: authToken,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'verify': {
        if (!token) {
          throw new Error('Token is required');
        }

        const verification = verifyToken(token);
        
        if (!verification.valid || !verification.payload) {
          return new Response(JSON.stringify({
            success: false,
            valid: false,
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Get fresh user data
        const result = await callMongoDBAPI(MONGODB_APP_ID, MONGODB_API_KEY, 'findOne', {
          filter: { _id: verification.payload.sub },
        });

        if (!result.document) {
          return new Response(JSON.stringify({
            success: false,
            valid: false,
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const user = result.document;

        return new Response(JSON.stringify({
          success: true,
          valid: true,
          user: { id: user._id, email: user.email, name: user.name, role: user.role },
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'logout': {
        return new Response(JSON.stringify({
          success: true,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error: unknown) {
    console.error('Auth function error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message, success: false }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
