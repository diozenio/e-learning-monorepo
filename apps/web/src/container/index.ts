import AuthService from '@/core/services/AuthService';
import AuthAPI from '@/infra/auth/AuthAPI';

const AuthServiceInstance = new AuthService(new AuthAPI());

export const services = {
  AuthService: AuthServiceInstance,
};
