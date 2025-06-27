import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpResponse } from '@/shared/http/HttpResponse';

import { GetCoursesUseCase } from './GetCoursesUseCase';

class CoursesController {
  constructor(private getCoursesUseCase: GetCoursesUseCase) {}

  async handle(_: FastifyRequest, reply: FastifyReply) {
    const courses = await this.getCoursesUseCase.execute();
    return reply
      .status(200)
      .send(new HttpResponse('Courses fetched successfully', 200, courses));
  }
}

export { CoursesController };
