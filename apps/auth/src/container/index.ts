import {
  GetMeController,
  GetMeUseCase,
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
const getMeUseCase = new GetMeUseCase(userRepository);

// Controllers
const loginController = new LoginController(loginUseCase);
const signupController = new SignupController(signupUseCase);
const getMeController = new GetMeController(getMeUseCase);

export const container = {
  loginController,
  signupController,
  getMeController,
};
