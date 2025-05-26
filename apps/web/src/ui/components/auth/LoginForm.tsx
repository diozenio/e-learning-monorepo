import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { SocialButton } from '@/ui/components/auth/SocialButton';
import { FormCheckbox, FormInput } from '@/ui/components/form';
import { Button } from '@/ui/primitives/button';
import { Divider } from '@/ui/primitives/divider';

function LoginForm() {
  return (
    <div className="contents">
      <form className="space-y-6">
        <div className="space-y-4">
          <FormInput
            name="email"
            label="Email"
            placeholder="hi@youremail.com"
            type="email"
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="flex justify-between gap-2">
          <FormCheckbox name="remember" label="Remember me" />
          <Link className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full">
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
