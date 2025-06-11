import { AUTH_COOKIE_NAME } from '@elearning/auth-tokens';
import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpResponse } from '@/shared/http/HttpResponse';

import { LogoutUseCase } from './LogoutUseCase';

class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const sessionToken = request.cookies[AUTH_COOKIE_NAME];

    await this.logoutUseCase.execute(sessionToken);

    return reply
      .status(200)
      .send(new HttpResponse('Logged out successfully', 200));
  }
}

export { LogoutController };
