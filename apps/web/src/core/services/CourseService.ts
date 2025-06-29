import CourseUseCase from '@/core/interfaces/usecases/CourseUseCase';

export default class CourseService extends CourseUseCase {
  async getCourses() {
    return this.adapter.getCourses();
  }
}
