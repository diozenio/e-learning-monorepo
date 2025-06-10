import { IUserSessionRepository } from '@/repositories/user-sessions';
import { AppError } from '@/shared/http/errors/AppError';

class LogoutUseCase {
  constructor(private userSessionRepository: IUserSessionRepository) {}

  async execute(token?: string) {
    if (!token) {
      throw new AppError('Authentication token not provided.', 401);
    }

    const sessionExists = await this.userSessionRepository.findByToken(token);

    if (!sessionExists) {
      return;
    }

    await this.userSessionRepository.delete(token);
  }
}

export { LogoutUseCase };
