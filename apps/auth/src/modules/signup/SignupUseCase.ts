import { generateToken } from '@/lib/jwt/generateToken';
import { hashPassword } from '@/lib/security/password';
import { IUserRepository } from '@/repositories/users';
import { AppError } from '@/shared/http/errors/AppError';

import { SignupParams } from './SignupParams';

class SignupUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: SignupParams) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      throw new AppError(
        'Something unexpected went wrong. Please try signing up again.',
        500
      );
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError(
        'An unexpected error occurred while finalizing your registration. Please try again or contact support.',
        500
      );
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

export { SignupUseCase };
