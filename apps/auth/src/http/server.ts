import cookie from '@fastify/cookie';
import fastify from 'fastify';

import { env } from '@/env';
import { router } from '@/http/routes/router';
import corsPlugin from '@/plugins/cors';
import { errorHandler } from '@/shared/http/errors/errorHandler';

const app = fastify();

corsPlugin(app);

app.setErrorHandler(errorHandler);

app.register(cookie);

app.register(router, { prefix: '/auth' });

const port = env.PORT;

app.listen({ port, host: '0.0.0.0' }).then(() => {
  if (env.NODE_ENV !== 'production') {
    console.log(`Server is running on http://localhost:${port}/auth`);
  }
});
