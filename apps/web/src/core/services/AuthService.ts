import AuthUseCase from '@/core/interfaces/usecases/AuthUseCase';

export default class AuthService extends AuthUseCase {
  async login(email: string, password: string, remember: boolean) {
    return this.adapter.login(email, password, remember);
  }

  async signUpWithCredentials(email: string, password: string, name: string) {
    return this.adapter.signUpWithCredentials(email, password, name);
  }

  async getUserSession() {
    return this.adapter.getUserSession();
  }

  async logout() {
    return this.adapter.logout();
  }
}
