import jwt from 'jsonwebtoken';

import { env } from '@/env';

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as {
    sub: string;
    email: string;
  };
}
