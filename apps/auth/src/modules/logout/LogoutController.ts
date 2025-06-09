import { AUTH_COOKIE_NAME } from '@elearning/auth-tokens';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from '@/shared/http/errors/AppError';
import { HttpResponse } from '@/shared/http/HttpResponse';

import { LogoutUseCase } from './LogoutUseCase';

class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const sessionToken = request.cookies[AUTH_COOKIE_NAME];

    if (!sessionToken) {
      return reply
        .send(401)
        .send(new AppError('Authentication token not provided.', 401));
    }

    await this.logoutUseCase.execute(sessionToken);

    return reply
      .status(200)
      .send(new HttpResponse('Logged out successfully', 200));
  }
}

export { LogoutController };
