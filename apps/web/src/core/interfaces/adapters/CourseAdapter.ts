import { CourseListResponse } from '@/core/domain/models/catalog';

export default abstract class CourseAdapter {
  abstract getCourses(): Promise<CourseListResponse>;
}
