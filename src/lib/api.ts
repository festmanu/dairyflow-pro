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

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  valid?: boolean;
  error?: string;
}

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

// Auth API wrapper
export const authAPI = {
  async signup(email: string, password: string, name?: string): Promise<AuthResponse> {
    const response = await supabase.functions.invoke('auth', {
      body: { action: 'signup', email, password, name },
    });

    if (response.error) throw new Error(response.error.message);
    
    const data = response.data as AuthResponse;
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await supabase.functions.invoke('auth', {
      body: { action: 'login', email, password },
    });

    if (response.error) throw new Error(response.error.message);
    
    const data = response.data as AuthResponse;
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async verify(): Promise<AuthResponse> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, valid: false };
    }

    const response = await supabase.functions.invoke('auth', {
      body: { action: 'verify', token },
    });

    if (response.error) {
      this.logout();
      return { success: false, valid: false };
    }
    
    const data = response.data as AuthResponse;
    if (data.valid && data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      this.logout();
    }
    
    return data;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
