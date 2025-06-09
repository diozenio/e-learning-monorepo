'use client';

import { PropsWithChildren } from 'react';

import { AppLoadingProvider } from './AppLoadingContext';
import { AuthProvider } from './AuthContext';
import { QueryProvider } from './QueryProvider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppLoadingProvider>{children}</AppLoadingProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
