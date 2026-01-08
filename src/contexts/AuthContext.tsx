import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await authAPI.verify();
        if (result.valid && result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authAPI.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      throw new Error(result.error || 'Login failed');
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    const result = await authAPI.signup(email, password, name);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      throw new Error(result.error || 'Signup failed');
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
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
