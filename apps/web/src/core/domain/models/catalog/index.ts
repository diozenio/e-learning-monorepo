import { ApiResponse } from '@/core/domain/types/ApiResponse';

export type CourseStatus = 'locked' | 'available' | 'completed' | 'in-progress';

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: number;
  slug?: string;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  price?: number;
  difficulty?: CourseDifficulty;
  requiredLevel?: number;
  status?: CourseStatus;
  duration?: number;
  durationLeft?: number;
  modules?: number;
}

export type CourseListResponse = ApiResponse<Course[]>;
