'use client';

import { useQuery } from '@tanstack/react-query';

import { services } from '@/container';
import { CourseListResponse } from '@/core/domain/models/catalog';

export function useCourses() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery<CourseListResponse>({
    queryKey: ['courses'],
    queryFn: async () => {
      return services.CourseService.getCourses();
    },
  });

  return {
    courses: courses?.data ?? [],
    isLoading,
    isError,
    error,
  };
}
