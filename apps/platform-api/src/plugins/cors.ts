import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

import { env } from '@/env';

export default async function corsPlugin(app: FastifyInstance): Promise<void> {
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = env.ALLOWED_ORIGINS;

      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
}
