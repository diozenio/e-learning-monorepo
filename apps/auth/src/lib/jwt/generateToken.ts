import jwt, { SignOptions } from 'jsonwebtoken';

import { env } from '@/env';

type Payload = {
  sub: string;
  email: string;
};

interface IGenerateToken {
  payload: Payload;
  secret?: string;
  expiresIn?: SignOptions['expiresIn'];
}

export function generateToken({
  payload,
  secret = env.JWT_SECRET,
  expiresIn = '30d',
}: IGenerateToken): string {
  return jwt.sign(payload, secret, { expiresIn });
}
