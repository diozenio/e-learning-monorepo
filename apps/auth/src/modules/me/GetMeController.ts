import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpResponse } from '@/shared/http/HttpResponse';

import { GetMeUseCase } from './GetMeUseCase';

class GetMeController {
  constructor(private getMeUseCase: GetMeUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;
    const user = await this.getMeUseCase.execute(id);

    return reply
      .status(200)
      .send(new HttpResponse('User data fetched successfully', 200, user));
  }
}

export { GetMeController };
