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

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { SignupUseCase };
