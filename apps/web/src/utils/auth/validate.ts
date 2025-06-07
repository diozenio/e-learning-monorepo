import { z } from 'zod';

export function validateLoginCredentials(formData: FormData) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  });

  const data = loginSchema.parse(Object.fromEntries(formData));

  return data;
}

export function validateSignUpCredentials(formData: FormData) {
  const MIN_LENGTH = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[^\w\s]/;

  const signUpSchema = z
    .object({
      name: z.string().min(3, 'Name must be at least 3 characters long.'),
      email: z.string().email('Invalid email address.'),
      password: z
        .string()
        .min(
          MIN_LENGTH,
          `Password must be at least ${MIN_LENGTH} characters long.`
        )
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
      'confirm-password': z.string(),
    })
    .refine((data) => data.password === data['confirm-password'], {
      message: "Passwords don't match",
      path: ['confirm-password'],
    });

  return signUpSchema.parse(Object.fromEntries(formData));
}
