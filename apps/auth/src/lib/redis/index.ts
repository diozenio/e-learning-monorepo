import Redis from 'ioredis';

import { env } from '@/env';

const redis = new Redis(env.REDIS_URL);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export { redis };
