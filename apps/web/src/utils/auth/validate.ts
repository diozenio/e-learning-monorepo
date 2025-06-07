import { z } from 'zod';

export function validateLoginCredentials(formData: FormData) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  });

  const data = loginSchema.parse(Object.fromEntries(formData));

  return data;
}
