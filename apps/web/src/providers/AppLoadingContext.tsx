'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

import { useAppLoadingStore } from '@/store/appLoading';

interface AppLoadingContextType {
  isAppLoading: boolean;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(
  undefined
);

export function AppLoadingProvider({ children }: PropsWithChildren) {
  const { isAppLoading } = useAppLoadingStore();

  if (isAppLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading application...</h1>
      </div>
    );
  }

  return (
    <AppLoadingContext.Provider value={{ isAppLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
}

export function useAppLoading() {
  const context = useContext(AppLoadingContext);
  if (!context) {
    throw new Error('useAppLoading must be used within an AppLoadingProvider');
  }
  return context;
}
