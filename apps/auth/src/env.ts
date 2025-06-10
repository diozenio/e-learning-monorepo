import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.string(),
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .default('http://localhost:3000')
    .transform((val) => {
      if (val === '*') return ['*'];
      return val?.split(',').map((origin) => origin.trim());
    }),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required and cannot be empty'),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
});

export const env = envSchema.parse(process.env);
