import { useMutation } from '@tanstack/react-query';

import { services } from '@/container';
import { LoginResponse } from '@/core/domain/models/auth';
import { useHandleAuthSuccess } from '@/utils/auth/handleAuthSuccess';

interface LoginProps {
  email: string;
  password: string;
}

export function useLogin() {
  const handleAuthSuccess = useHandleAuthSuccess();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }: LoginProps) => {
      return services.AuthService.login(email, password);
    },
    onSuccess: (response: LoginResponse) => {
      const { token, user } = response.data;
      handleAuthSuccess(token, user);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    login({ email, password });
  };

  return {
    handleSubmit,
    isPending,
    error,
  };
}
