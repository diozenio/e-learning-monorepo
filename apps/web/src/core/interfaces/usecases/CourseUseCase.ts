import { CourseListResponse } from '@/core/domain/models/catalog';
import CourseAdapter from '@/core/interfaces/adapters/CourseAdapter';

export default abstract class CourseUseCase {
  constructor(protected readonly adapter: CourseAdapter) {}

  abstract getCourses(): Promise<CourseListResponse>;
}
