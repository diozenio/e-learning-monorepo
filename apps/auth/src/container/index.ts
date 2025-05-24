import {
  LoginController,
  LoginUseCase,
  SignupController,
  SignupUseCase,
} from '@/modules';
import { PrismaUserRepository } from '@/repositories/users';

// Repositories
const userRepository = new PrismaUserRepository();

// Use Cases
const loginUseCase = new LoginUseCase(userRepository);
const signupUseCase = new SignupUseCase(userRepository);

// Controllers
const loginController = new LoginController(loginUseCase);
const signupController = new SignupController(signupUseCase);

export const container = {
  loginController,
  signupController,
};
