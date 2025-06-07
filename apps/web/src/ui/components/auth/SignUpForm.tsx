'use client';

import { CircleX } from 'lucide-react';
import Link from 'next/link';

import { useSignUp } from '@/hooks/auth/useSignUp';
import { SocialButton } from '@/ui/components/auth/SocialButton';
import { FormInput } from '@/ui/components/form';
import { Alert, AlertDescription } from '@/ui/primitives/alert';
import { Button } from '@/ui/primitives/button';
import { Divider } from '@/ui/primitives/divider';

function SignUpForm() {
  const { handleSubmit, isPending, errors, message, success } = useSignUp();

  return (
    <div className="contents">
      {!success && message && (
        <Alert variant="destructive">
          <CircleX />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            errors={errors?.name}
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="hi@youremail.com"
            errors={errors?.email}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            errors={errors?.password}
          />
          <FormInput
            name="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            errors={errors?.['confirm-password']}
          />
        </div>
        <Button type="submit" className="w-full" loading={isPending}>
          Sign up
        </Button>
      </form>

      <Divider label="Or" />

      <SocialButton
        label="Continue with Google"
        provider="google"
        disabled={isPending}
      />

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link className="underline hover:no-underline" href="/auth/login">
          Login here
        </Link>
      </div>

      <p className="text-muted-foreground text-center text-xs">
        By signing up you agree to our{' '}
        <Link className="underline hover:no-underline" href="#">
          Terms
        </Link>
        .
      </p>
    </div>
  );
}

export { SignUpForm };
