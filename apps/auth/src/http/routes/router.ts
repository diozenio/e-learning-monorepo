import { FastifyInstance } from 'fastify';

import { container } from '@/container';
import { checkAuth } from '@/http/middlewares/checkAuth';

export async function router(app: FastifyInstance) {
  app.post('/login', async (request, response) => {
    return container.loginController.handle(request, response);
  });

  app.post('/signup', async (request, response) => {
    return container.signupController.handle(request, response);
  });

  app.get('/me', { preHandler: checkAuth }, async (request, reply) => {
    return container.getMeController.handle(request, reply);
  });

  app.post('/logout', { preHandler: checkAuth }, async (request, response) => {
    return container.logoutController.handle(request, response);
  });
}
