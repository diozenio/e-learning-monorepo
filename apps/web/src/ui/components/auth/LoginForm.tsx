'use client';

import { CircleX } from 'lucide-react';
import Link from 'next/link';

import { useLogin } from '@/hooks/auth/useLogin';
import { SocialButton } from '@/ui/components/auth/SocialButton';
import { FormCheckbox, FormInput } from '@/ui/components/form';
import { Alert, AlertDescription } from '@/ui/primitives/alert';
import { Button } from '@/ui/primitives/button';
import { Divider } from '@/ui/primitives/divider';

function LoginForm() {
  const { handleSubmit, isPending, errors, message, success } = useLogin();

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
            name="email"
            label="Email"
            placeholder="hi@youremail.com"
            type="email"
            errors={errors?.email}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            errors={errors?.password}
          />
        </div>
        <div className="flex justify-between gap-2">
          <FormCheckbox name="remember" label="Remember me" />
          <Link className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" loading={isPending}>
          Login
        </Button>
      </form>

      <Divider label="Or" />

      <SocialButton
        label="Login with Google"
        provider="google"
        disabled={isPending}
      />

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline hover:no-underline" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export { LoginForm };
