import { loginAction } from '@/app/(public)/auth/login/actions';
import { AuthPayload } from '@/core/domain/models/auth';
import { useHandleAuthSuccess } from '@/utils/auth/handleAuthSuccess';

import { useFormState } from '../useFormState';

export function useLogin() {
  const handleAuthSuccess = useHandleAuthSuccess();

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState<AuthPayload>(loginAction, ({ data }) => {
      if (data) {
        handleAuthSuccess(data.user);
      }
    });

  return {
    success,
    message,
    errors,
    handleSubmit,
    isPending,
  };
}
