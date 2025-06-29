'use client';

import { useCourses } from '@/hooks/catalog/courses/useCourses';

import { ContentCard } from './content-card';

function ContentCardList() {
  const { courses, isLoading } = useCourses();

  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {courses?.map((course, index) => (
        <ContentCard key={index} {...course} loading={isLoading} />
      ))}
    </div>
  );
}

export { ContentCardList };
