import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface MongoDBResponse<T = unknown> {
  document?: T;
  documents?: T[];
  insertedId?: string;
  insertedIds?: string[];
  matchedCount?: number;
  modifiedCount?: number;
  deletedCount?: number;
  error?: string;
}

// User type is now exported from AuthContext
// Auth is handled directly via Supabase Auth in AuthContext

// MongoDB API wrapper
export const mongoAPI = {
  async find<T>(collection: string, filter?: Record<string, unknown>, options?: {
    projection?: Record<string, unknown>;
    sort?: Record<string, unknown>;
    limit?: number;
    skip?: number;
  }): Promise<T[]> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'find',
        collection,
        filter,
        ...options,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse<T>).documents || [];
  },

  async findOne<T>(collection: string, filter: Record<string, unknown>): Promise<T | null> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'findOne',
        collection,
        filter,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse<T>).document || null;
  },

  async insertOne<T>(collection: string, document: T): Promise<string> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'insertOne',
        collection,
        document,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).insertedId || '';
  },

  async insertMany<T>(collection: string, documents: T[]): Promise<string[]> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'insertMany',
        collection,
        documents,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).insertedIds || [];
  },

  async updateOne(collection: string, filter: Record<string, unknown>, update: Record<string, unknown>): Promise<number> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'updateOne',
        collection,
        filter,
        update,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).modifiedCount || 0;
  },

  async updateMany(collection: string, filter: Record<string, unknown>, update: Record<string, unknown>): Promise<number> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'updateMany',
        collection,
        filter,
        update,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).modifiedCount || 0;
  },

  async deleteOne(collection: string, filter: Record<string, unknown>): Promise<number> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'deleteOne',
        collection,
        filter,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).deletedCount || 0;
  },

  async deleteMany(collection: string, filter: Record<string, unknown>): Promise<number> {
    const response = await supabase.functions.invoke('mongodb', {
      body: {
        action: 'deleteMany',
        collection,
        filter,
      },
    });

    if (response.error) throw new Error(response.error.message);
    return (response.data as MongoDBResponse).deletedCount || 0;
  },
};
// Auth is now handled directly via Supabase Auth in AuthContext
