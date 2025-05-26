import { z } from 'zod';

const MIN_LENGTH = 8;

const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[^\w\s]/;

export const signupParams = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters long.'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address.'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters long.`)
    .refine((val) => hasUppercase.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => hasLowercase.test(val), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine((val) => hasNumber.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine((val) => hasSpecialChar.test(val), {
      message:
        'Password must contain at least one special character (@$!%*?#&).',
    }),
});

export type SignupParams = z.infer<typeof signupParams>;
