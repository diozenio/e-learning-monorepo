import {
  GetMeController,
  GetMeUseCase,
  LoginController,
  LoginUseCase,
  LogoutController,
  LogoutUseCase,
  SignupController,
  SignupUseCase,
} from '@/modules';
import { UserSessionRepository } from '@/repositories/user-sessions';
import { PrismaUserRepository } from '@/repositories/users';

// Repositories
const userRepository = new PrismaUserRepository();
const userSessionRepository = new UserSessionRepository();

// Use Cases
const loginUseCase = new LoginUseCase(userRepository, userSessionRepository);
const signupUseCase = new SignupUseCase(userRepository, userSessionRepository);
const logoutUseCase = new LogoutUseCase(userSessionRepository);
const getMeUseCase = new GetMeUseCase(userRepository);

// Controllers
const loginController = new LoginController(loginUseCase);
const signupController = new SignupController(signupUseCase);
const logoutController = new LogoutController(logoutUseCase);
const getMeController = new GetMeController(getMeUseCase);

export const container = {
  loginController,
  signupController,
  getMeController,
  logoutController,
  userSessionRepository,
};
