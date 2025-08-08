'use client';

import { Loader } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import { useAppLoadingStore } from '@/store/appLoading';

interface AppLoadingContextType {
  isAppLoading: boolean;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(
  undefined
);

export function AppLoadingProvider({ children }: PropsWithChildren) {
  const { isAppLoading } = useAppLoadingStore();

  const [showingLoader, setShowingLoader] = useState(isAppLoading);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAppLoading) {
      setShowingLoader(true);
    } else {
      timeout = setTimeout(() => setShowingLoader(false), 250);
    }

    return () => clearTimeout(timeout);
  }, [isAppLoading]);

  return (
    <AppLoadingContext.Provider value={{ isAppLoading }}>
      <div
        className={cn('relative h-screen', showingLoader && 'overflow-hidden')}
        aria-busy={showingLoader}
        aria-live="polite"
      >
        {children}
        <AnimatePresence>
          {isAppLoading && (
            <motion.div
              key="app-loading-overlay"
              className="bg-background absolute inset-0 z-50 grid place-items-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="status"
            >
              <Loader className="h-6 w-6 animate-spin" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
