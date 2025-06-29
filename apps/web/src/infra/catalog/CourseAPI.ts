import CourseAdapter from '@/core/interfaces/adapters/CourseAdapter';
import { api } from '@/lib/platform-api-client';

export default class CourseAPI extends CourseAdapter {
  constructor() {
    super();
  }

  async getCourses() {
    const { data } = await api.get('/courses');

    return data;
  }
}
