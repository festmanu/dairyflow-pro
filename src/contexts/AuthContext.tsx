import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  verifyOtp: (email: string, token: string, password?: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getProfile(userId: string): Promise<{ name: string; role: string } | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error || !data) return null;
  return { name: data.name || '', role: data.role || 'farmer' };
}

function mapUser(supabaseUser: SupabaseUser, profile?: { name: string; role: string } | null): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: profile?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
    role: profile?.role || 'farmer',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getProfile(session.user.id);
        setUser(mapUser(session.user, profile));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await getProfile(session.user.id);
        setUser(mapUser(session.user, profile));
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email: string, _password: string, name?: string) => {
    // Use signInWithOtp to send a 6-digit code (not a link)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: { name },
      },
    });
    if (error) throw error;
  };

  const verifyOtp = async (email: string, token: string, password?: string, name?: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;
    
    // After OTP verification, set the password
    if (password) {
      const { error: updateError } = await supabase.auth.updateUser({ 
        password,
        data: { name },
      });
      if (updateError) throw updateError;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      verifyOtp,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
