import { IUserSessionRepository } from '@/repositories/user-sessions';
import { AppError } from '@/shared/http/errors/AppError';

class LogoutUseCase {
  constructor(private userSessionRepository: IUserSessionRepository) {}

  async execute(token: string) {
    const sessionExists = await this.userSessionRepository.findByToken(token);

    if (!sessionExists) {
      throw new AppError('Session not found or already expired.', 404);
    }

    await this.userSessionRepository.delete(token);
  }
}

export { LogoutUseCase };
