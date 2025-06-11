import { z } from 'zod';

export const loginParams = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string({
    invalid_type_error: 'Invalid password.',
  }),
});

export type LoginParams = z.infer<typeof loginParams>;
