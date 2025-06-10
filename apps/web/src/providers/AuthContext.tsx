'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { User } from '@/core/domain/models/auth';
import { useLogout } from '@/hooks/auth/useLogout';
import { useUserSession } from '@/hooks/auth/useUserSession';
import { useAppLoadingStore } from '@/store/appLoading';

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: User | null;
  logout: () => void;
  // Add any other authentication-related methods or properties here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const { user, fetchUserSession, isLoading, error } = useUserSession();
  const { logout } = useLogout();
  const { setLoadingState } = useAppLoadingStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserSession();
  }, [fetchUserSession]);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  useEffect(() => {
    setLoadingState('auth', isLoading);
  }, [isLoading, setLoadingState]);

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
      setIsAuthenticated(false);
      logout();
    }
  }, [error, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthenticating: isLoading,
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
