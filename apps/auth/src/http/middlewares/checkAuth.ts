import { AUTH_COOKIE_NAME, verifyToken } from '@elearning/auth-tokens';
import { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '@/env';
import { AppError } from '@/shared/http/errors/AppError';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
    };
  }
}

export async function checkAuth(request: FastifyRequest, reply: FastifyReply) {
  const sessionToken = request.cookies[AUTH_COOKIE_NAME];

  if (!sessionToken) {
    return reply
      .status(401)
      .send(new AppError('Authentication token not provided.', 401));
  }

  try {
    const { sub, email } = verifyToken(sessionToken, env.JWT_SECRET);
    request.user = { id: sub, email: email };
  } catch {
    return reply
      .status(401)
      .send(new AppError('Invalid or expired authentication token.', 401));
  }
}
