'use client';

import { useEffect, useState } from 'react';

import { ContentCard } from '@/ui/components/content';

import { courses } from './courses';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate a 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {courses.map((course, index) => (
          <ContentCard key={index} {...course} loading={isLoading} />
        ))}
      </div>
    </div>
  );
}
