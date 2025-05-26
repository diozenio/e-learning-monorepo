import { useMutation } from '@tanstack/react-query';

import { services } from '@/container';
import { SignUpResponse } from '@/core/domain/models/auth';
import { useHandleAuthSuccess } from '@/utils/auth/handleAuthSuccess';

interface SignUpProps {
  email: string;
  password: string;
  name: string;
}

function useSignUp() {
  const handleAuthSuccess = useHandleAuthSuccess();

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password, name }: SignUpProps) => {
      return services.AuthService.signUpWithCredentials(email, password, name);
    },
    onSuccess: (response: SignUpResponse) => {
      const { token, user } = response.data;
      handleAuthSuccess(token, user);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    signUp({ email, password, name });
  };

  return {
    handleSubmit,
    isPending,
    error,
  };
}

export { useSignUp };
