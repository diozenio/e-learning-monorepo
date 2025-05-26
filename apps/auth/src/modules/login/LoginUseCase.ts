import { generateToken } from '@/lib/jwt/generateToken';
import { comparePasswords } from '@/lib/security/password';
import { IUserRepository } from '@/repositories/users';
import { AppError } from '@/shared/http/errors/AppError';

import { LoginParams } from './LoginParams';

class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginParams) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({
      payload: { sub: user.id, email: user.email },
    });

    if (!token) {
      throw new AppError(
        "We couldn't log you in at the moment. Please try again later.",
        500
      );
    }

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
