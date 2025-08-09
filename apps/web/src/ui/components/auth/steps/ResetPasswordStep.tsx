'use client';

import { useRouter } from 'next/navigation';

import { resetPasswordAction } from '@/app/(public)/auth/forgot-password/actions';
import { useFormState } from '@/hooks/useFormState';
import { FormInput } from '@/ui/components/form';
import { Button } from '@/ui/primitives/button';

export function ResetPasswordStep() {
  const router = useRouter();
  const [formState, handleSubmit, isPending] = useFormState(
    resetPasswordAction,
    () => {
      alert('Password changed successfully!');
      router.push('/auth/login');
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <FormInput
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          errors={formState.errors?.password}
        />
        <FormInput
          name="passwordConfirmation"
          label="Confirm New Password"
          type="password"
          placeholder="Re-enter your new password"
          errors={formState.errors?.passwordConfirmation}
        />
      </div>
      <Button type="submit" className="w-full" loading={isPending}>
        Reset Password
      </Button>
    </form>
  );
}
