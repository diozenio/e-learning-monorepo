import { FastifyInstance } from 'fastify';

export async function router(app: FastifyInstance) {
  app.post('/login', async (_, response) => {
    return response.status(200).send({
      message: 'Login endpoint is not implemented yet.',
    });
  });

  app.post('/signup', async (request, response) => {
    return response.status(200).send({
      message: 'Signup endpoint is not implemented yet.',
    });
  });
}
