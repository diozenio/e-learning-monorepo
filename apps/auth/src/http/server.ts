import fastify from 'fastify';

import { router } from '@/http/routes/router';

const app = fastify();

app.register(router, { prefix: '/auth' });

const port = 8080;

app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`Server is running on http://localhost:${port}/auth`);
});
