import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpResponse } from '@/shared/http/HttpResponse';

import { signupParams } from './SignupParams';
import { SignupUseCase } from './SignupUseCase';

class SignupController {
  constructor(private signupUseCase: SignupUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const params = signupParams.parse(request.body);
    const result = await this.signupUseCase.execute(params);

    return reply
      .status(201)
      .send(new HttpResponse('User created successfully', 201, result));
  }
}

export { SignupController };
