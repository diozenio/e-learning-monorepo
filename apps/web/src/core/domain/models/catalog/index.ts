import { ApiResponse } from '@/core/domain/types/ApiResponse';

export type CourseStatus = 'locked' | 'available' | 'completed' | 'in-progress';

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface StrapiMedia {
  id: number;
  url: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  hash: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface KeyPoint {
  id: number;
  text: string;
}

interface Lesson {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  video: StrapiMedia | null;
  key_points: KeyPoint[];
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

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
  modules?: Module[];
}

export type CourseListResponse = ApiResponse<Course[]>;
