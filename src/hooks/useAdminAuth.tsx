import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  // You might want to add more properties from Supabase's User object if needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session) {
        // Map Supabase session user to our simplified User interface
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Initial check for session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Initial session check:', { session, error });
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
      } else {
        setUser(null);
    }
    setIsLoading(false);
    };

    getSession();

    return () => {
      // Correctly unsubscribe from the auth listener
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase login error:', error.message);
      setIsLoading(false);
      return false;
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
      });
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Supabase logout error:', error.message);
    }
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
