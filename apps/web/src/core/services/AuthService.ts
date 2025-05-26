import AuthUseCase from '@/core/interfaces/usecases/AuthUseCase';

export default class AuthService extends AuthUseCase {
  async login(email: string, password: string) {
    return this.adapter.login(email, password);
  }

  async signUpWithCredentials(email: string, password: string, name: string) {
    return this.adapter.signUpWithCredentials(email, password, name);
  }
}
