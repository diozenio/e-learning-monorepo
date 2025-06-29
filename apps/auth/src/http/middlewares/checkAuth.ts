import { AUTH_COOKIE_NAME, verifyToken } from '@elearning/auth-tokens';
import { FastifyRequest } from 'fastify';

import { container } from '@/container';
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

export async function checkAuth(request: FastifyRequest) {
  const sessionToken = request.cookies[AUTH_COOKIE_NAME];

  if (!sessionToken) {
    throw new AppError('Authentication token not provided.', 401);
  }

  try {
    const { sub, email } = verifyToken(sessionToken, env.JWT_SECRET);
    request.user = { id: sub, email: email };

    const userSession =
      await container.userSessionRepository.findByToken(sessionToken);

    if (!userSession) {
      throw new AppError(
        'Invalid or expired authentication token. Session not found.',
        401
      );
    }
  } catch {
    throw new AppError('Invalid or expired authentication token.', 401);
  }
}
