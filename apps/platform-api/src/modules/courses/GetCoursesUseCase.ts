import { env } from '@/env';
import { cmsApi } from '@/shared/lib/axios';

interface StrapiCourse {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requiredLevel: number;
  image?: {
    url: string;
  };
  course_category?: {
    name: string;
  };
}

class GetCoursesUseCase {
  async execute() {
    try {
      const { data: response } = await cmsApi.get<{ data: StrapiCourse[] }>(
        '/courses',
        {
          params: {
            populate: ['image', 'course_category'],
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
          // Mocked additional fields
          status: 'available', // Mocked variant
          duration: 12, // Mocked duration
          modules: 10, // Mocked modules
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
