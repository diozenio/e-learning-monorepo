import { generateToken } from '@elearning/auth-tokens';
import dayjs from 'dayjs';

import { env } from '@/env';
import { comparePasswords } from '@/lib/security/password';
import { IUserSessionRepository } from '@/repositories/user-sessions';
import { IUserRepository } from '@/repositories/users';
import { AppError } from '@/shared/http/errors/AppError';

import { LoginParams } from './LoginParams';

class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userSessionRepository: IUserSessionRepository
  ) {}

  async execute({ email, password }: LoginParams) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Authentication failed. Please verify your credentials.',
        401
      );
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        'Authentication failed. Please verify your credentials.',
        401
      );
    }

    const token = generateToken({
      payload: { sub: user.id, email: user.email },
      secret: env.JWT_SECRET,
    });

    if (!token) {
      throw new AppError(
        "We couldn't log you in at the moment. Please try again later.",
        500
      );
    }

    const expiresAt = dayjs().add(30, 'days').toDate(); //

    await this.userSessionRepository.create({
      userId: user.id,
      token,
      expiresAt,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { LoginUseCase };
