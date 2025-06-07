import { signupAction } from '@/app/(public)/auth/signup/actions';
import { AuthPayload } from '@/core/domain/models/auth';
import { useHandleAuthSuccess } from '@/utils/auth/handleAuthSuccess';

import { useFormState } from '../useFormState';

export function useSignUp() {
  const handleAuthSuccess = useHandleAuthSuccess();

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState<AuthPayload>(signupAction, ({ data }) => {
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
