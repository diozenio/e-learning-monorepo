import { FastifyInstance } from 'fastify';

import { container } from '@/container';

export async function router(app: FastifyInstance) {
  app.get('/courses', async (request, reply) => {
    return container.getCoursesController.handle(request, reply);
  });
}
