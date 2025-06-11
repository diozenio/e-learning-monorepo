import {
  IUserRepository,
  UserModel,
} from '@/repositories/users/IUserRepository';
import { AppError } from '@/shared/http/errors/AppError';

class GetMeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export { GetMeUseCase };
