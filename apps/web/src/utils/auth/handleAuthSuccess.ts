import { useRouter } from 'next/navigation';

import { User } from '@/core/domain/models/auth';
import { useAuthStore } from '@/store/auth';

export function useHandleAuthSuccess() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return (user: User) => {
    setUser(user);

    router.push('/');
  };
}
