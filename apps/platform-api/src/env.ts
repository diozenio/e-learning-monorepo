import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8081),
  NODE_ENV: z.string().default('development'),
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .default('http://localhost:3000')
    .transform((val) => {
      if (val === '*') return ['*'];
      return val?.split(',').map((origin) => origin.trim());
    }),
  CMS_API_URL: z.string().url(),
  CMS_API_TOKEN: z.string().min(1, 'CMS_API_TOKEN is required'),
});

export const env = envSchema.parse(process.env);
