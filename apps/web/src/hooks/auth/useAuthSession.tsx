'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { services } from '@/container';
import { User } from '@/core/domain/models/auth';
import { useAuthStore } from '@/store/auth';

export function useAuthSession() {
  const { setUser } = useAuthStore();

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ['userSession'],
    queryFn: async () => {
      return services.AuthService.getUserSession();
    },
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (isError) {
      console.error('Error fetching user session:', error.message);
      setUser(null);
    }
  }, [isError, error, setUser]);

  return {
    user,
    isLoading,
    isError,
    error,
    fetchUserSession: refetch,
  };
}
