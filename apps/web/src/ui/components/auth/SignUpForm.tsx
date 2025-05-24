import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { FormInput } from '@/ui/components/form';
import { Button } from '@/ui/primitives/button';
import { Divider } from '@/ui/primitives/divider';

function SignUpForm() {
  return (
    <div className="contents">
      <form className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Full Name" placeholder="John Doe" />
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="hi@youremail.com"
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <FormInput
            name="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
      <Divider label="Or" />
      <Button variant="outline" className="w-full">
        <FcGoogle />
        Continue with Google
      </Button>

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
