'use client';

import { requestPasswordResetAction } from '@/app/(public)/auth/forgot-password/actions';
import { useFormState } from '@/hooks/useFormState';
import { Button } from '@/ui/primitives/button';

import { FormInput } from '../../form';

interface EmailStepProps {
  setUserEmail: (email: string) => void;
  onSuccess: () => void;
}

export function EmailStep({ setUserEmail, onSuccess }: EmailStepProps) {
  const [formState, handleSubmit, isPending] = useFormState(
    requestPasswordResetAction,
    onSuccess
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        errors={formState.errors?.email}
        required
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Button type="submit" className="w-full" loading={isPending}>
        Send Recovery Link
      </Button>
    </form>
  );
}
