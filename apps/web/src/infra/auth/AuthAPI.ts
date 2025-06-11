import { User } from '@/core/domain/models/auth';
import AuthAdapter from '@/core/interfaces/adapters/AuthAdapter';
import { authClient } from '@/lib/auth/client';

export default class AuthAPI extends AuthAdapter {
  constructor() {
    super();
  }

  async login(email: string, password: string) {
    const { data } = await authClient.post('/auth/login', {
      email,
      password,
    });

    return data;
  }

  async signUpWithCredentials(email: string, password: string, name: string) {
    const { data } = await authClient.post('/auth/signup', {
      email,
      password,
      name,
    });

    return data;
  }

  async getUserSession(): Promise<User> {
    const { data } = await authClient.get('/auth/me');

    return data.data;
  }

  async logout() {
    const { data } = await authClient.post('/auth/logout');

    return data;
  }
}
