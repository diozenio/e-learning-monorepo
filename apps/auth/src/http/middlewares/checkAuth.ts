import { FastifyRequest } from 'fastify';

import { verifyToken } from '@/lib/jwt/verifyToken';
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
  const sessionToken = request.cookies.session_token;

  if (!sessionToken) {
    throw new AppError('Authentication token not provided.', 401);
  }

  try {
    const { sub, email } = verifyToken(sessionToken);
    request.user = { id: sub, email: email };
  } catch {
    throw new AppError('Invalid or expired authentication token.', 401);
  }
}
