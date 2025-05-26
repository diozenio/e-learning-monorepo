import { useRouter } from 'next/navigation';

import { User } from '@/core/domain/models/auth';
import { useAuthStore } from '@/store/auth';

import { storeAccessToken } from './storeAccessToken';

export function useHandleAuthSuccess() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return (token: string, user: User) => {
    storeAccessToken(token);

    setUser(user);

    router.push('/');
  };
}
