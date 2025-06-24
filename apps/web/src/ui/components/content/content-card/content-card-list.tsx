'use client';

import { useEffect, useState } from 'react';

import { ContentCard } from './content-card';
import { courses } from './courses';

function ContentCardList() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate a 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {courses.map((course, index) => (
        <ContentCard key={index} {...course} loading={isLoading} />
      ))}
    </div>
  );
}

export { ContentCardList };
