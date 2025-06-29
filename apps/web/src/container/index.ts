import AuthService from '@/core/services/AuthService';
import CourseService from '@/core/services/CourseService';
import AuthAPI from '@/infra/auth/AuthAPI';
import CourseAPI from '@/infra/catalog/CourseAPI';

const AuthServiceInstance = new AuthService(new AuthAPI());
const CourseServiceInstance = new CourseService(new CourseAPI());

export const services = {
  AuthService: AuthServiceInstance,
  CourseService: CourseServiceInstance,
};
