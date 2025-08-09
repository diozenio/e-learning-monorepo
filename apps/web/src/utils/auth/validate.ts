import { z } from 'zod';

const MIN_LENGTH = 8;
const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[^\w\s]/;

const passwordSchema = z
  .string()
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
    message: 'Password must contain at least one special character (@$!%*?#&).',
  });

export function validateLoginCredentials(formData: FormData) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    remember: z.enum(['true', 'false']).transform((val) => val === 'true'),
  });

  const data = loginSchema.parse(Object.fromEntries(formData));

  return data;
}

export function validateSignUpCredentials(formData: FormData) {
  const signUpSchema = z
    .object({
      name: z.string().min(3, 'Name must be at least 3 characters long.'),
      email: z.string().email('Invalid email address.'),
      password: passwordSchema,
      'confirm-password': z.string(),
    })
    .refine((data) => data.password === data['confirm-password'], {
      message: "Passwords don't match",
      path: ['confirm-password'],
    });

  return signUpSchema.parse(Object.fromEntries(formData));
}

export function validateForgotPassword(formData: FormData) {
  const schema = z.object({
    email: z.string().email('Please enter a valid email address.'),
  });
  return schema.parse(Object.fromEntries(formData));
}

export function validateOtp(formData: FormData) {
  const schema = z.object({
    otp: z
      .string()
      .min(6, 'The code must be 6 digits.')
      .regex(/^\d{6}$/, 'The code must contain only numbers.'),
  });
  return schema.parse(Object.fromEntries(formData));
}

export function validateResetPassword(formData: FormData) {
  const schema = z
    .object({
      password: passwordSchema,
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords don't match.",
      path: ['passwordConfirmation'],
    });
  return schema.parse(Object.fromEntries(formData));
}
