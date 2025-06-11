import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpResponse } from '@/shared/http/HttpResponse';

import { loginParams } from './LoginParams';
import { LoginUseCase } from './LoginUseCase';

class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const params = loginParams.parse(request.body);
    const result = await this.loginUseCase.execute(params);

    return reply
      .status(200)
      .send(new HttpResponse('Login successful', 200, result));
  }
}

export { LoginController };
