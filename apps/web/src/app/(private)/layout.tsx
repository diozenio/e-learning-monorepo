import { PropsWithChildren } from 'react';

import { AppLoadingProvider } from '@/providers/AppLoadingContext';
import { AuthProvider } from '@/providers/AuthContext';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <AppLoadingProvider>{children}</AppLoadingProvider>
    </AuthProvider>
  );
}
