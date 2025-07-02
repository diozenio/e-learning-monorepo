import { env } from '@/env';
import { cmsApi } from '@/shared/lib/axios';

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

interface CourseCategory {
  name: string;
}

interface StrapiCourse {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredLevel: number;
  image?: StrapiMedia;
  course_category?: CourseCategory;
  modules: Module[];
}

class GetCoursesUseCase {
  async execute() {
    try {
      const { data: response } = await cmsApi.get<{ data: StrapiCourse[] }>(
        '/courses',
        {
          params: {
            populate: {
              image: true,
              course_category: true,
              modules: {
                populate: {
                  lessons: {
                    populate: ['video', 'key_points'],
                  },
                },
              },
            },
          },
        }
      );

      const courses = response.data.map((course) => {
        return {
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          image: course.image?.url
            ? `${env.CMS_API_URL?.replace('/api', '')}${course.image.url}`
            : undefined,
          category: course.course_category?.name ?? null,
          price: course.price,
          difficulty: course.difficulty,
          requiredLevel: course.requiredLevel,
          modules: course.modules ?? [],
          // Mocked additional fields
          status: 'available', // Mocked variant
          duration: 12, // Mocked duration
          durationLeft: 12, // Mocked duration left
        };
      });

      return courses;
    } catch (error) {
      console.error('Error fetching courses from CMS:', error);
      throw new Error('Could not fetch courses.');
    }
  }
}

export { GetCoursesUseCase };
