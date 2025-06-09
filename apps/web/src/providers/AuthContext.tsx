'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useAppLoadingStore } from '@/store/appLoading';
import { useAuthStore } from '@/store/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: { id: string; name: string; email: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const { user: zustandUser, setUser } = useAuthStore();
  const { isLoading, fetchUserSession, error } = useAuthSession();
  const { setLoadingState } = useAppLoadingStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      await fetchUserSession();
    }
    checkSession();
  }, [fetchUserSession]);

  useEffect(() => {
    setIsAuthenticated(!!zustandUser);
  }, [zustandUser]);

  useEffect(() => {
    setLoadingState('auth', isLoading);
  }, [isLoading, setLoadingState]);

  const logout = () => {
    setUser(null);
    // Optionally, you can clear any session cookies or tokens here by calling a logout function from the server
  };

  useEffect(() => {
    if (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [error, setUser]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating: isLoading,
        user: zustandUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
