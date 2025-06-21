import { ContentCardProps } from '@/ui/components/content';

export const courses: ContentCardProps[] = [
  {
    title: 'Learn React',
    description:
      'A comprehensive guide to mastering React.js. Build dynamic user interfaces with ease. Includes hands-on projects and real-world examples. Perfect for beginners and intermediate developers.',
    category: 'Frontend Development',
    price: 1000,
    duration: 13,
    difficulty: 'intermediate',
    modules: 5,
    variant: 'in-progress',
    durationLeft: 3,
  },
  {
    title: 'Node.js Essentials',
    description:
      'Understand the core concepts of Node.js, build scalable APIs, and master asynchronous programming with practical examples.',
    category: 'Backend Development',
    price: 900,
    duration: 8,
    difficulty: 'intermediate',
    modules: 6,
    variant: 'in-progress',
    durationLeft: 4,
  },
  {
    title: 'UI/UX Design Fundamentals',
    description:
      'Learn the principles of user interface and user experience design. From wireframes to prototypes, create designs users love.',
    category: 'Design',
    price: 800,
    duration: 6,
    difficulty: 'beginner',
    modules: 4,
    variant: 'available',
  },
  {
    title: 'Python for Data Science',
    description:
      'Explore data analysis, visualization, and machine learning using Python libraries like Pandas, Matplotlib, and Scikit-learn.',
    category: 'Data Science',
    price: 1200,
    duration: 12,
    difficulty: 'intermediate',
    modules: 7,
    variant: 'available',
  },
  {
    title: 'Intro to Cybersecurity',
    description:
      'Understand the fundamentals of cybersecurity, threat models, and how to protect systems and data from common attacks.',
    category: 'Security',
    price: 950,
    duration: 9,
    difficulty: 'advanced',
    modules: 5,
    variant: 'available',
  },
  {
    title: 'Building Mobile Apps with Flutter',
    description:
      'Create beautiful, cross-platform mobile applications using Flutter and Dart. Hands-on lessons and real-world challenges included.',
    category: 'Mobile Development',
    price: 1100,
    duration: 11,
    difficulty: 'intermediate',
    modules: 6,
    variant: 'completed',
  },
  {
    title: 'Mastering Git & GitHub',
    description:
      'Learn everything from basic Git commands to advanced Git workflows. Collaborate efficiently and contribute to open source.',
    category: 'Tools & Productivity',
    price: 600,
    duration: 5,
    difficulty: 'beginner',
    modules: 3,
    variant: 'completed',
  },
  {
    title: 'AI with TensorFlow',
    description:
      'Dive into artificial intelligence with TensorFlow. Build, train, and deploy machine learning models for real-world applications.',
    category: 'Artificial Intelligence',
    price: 1400,
    duration: 14,
    difficulty: 'advanced',
    modules: 8,
    variant: 'locked',
    requiredLevel: 3,
  },
  {
    title: 'Next.js Deep Dive',
    description:
      'Go beyond the basics of Next.js. Learn SSR, ISR, middleware, and advanced routing for high-performance web applications.',
    category: 'Frontend Development',
    price: 1050,
    duration: 10,
    difficulty: 'advanced',
    modules: 6,
    variant: 'locked',
    requiredLevel: 3,
  },
  {
    title: 'SQL Mastery',
    description:
      'Master the language of data. Learn how to write efficient SQL queries, perform joins, and build reports from complex datasets.',
    category: 'Databases',
    price: 750,
    duration: 7,
    difficulty: 'intermediate',
    modules: 4,
    variant: 'locked',
    requiredLevel: 3,
  },
  {
    title: 'DevOps Crash Course',
    description:
      'Learn the essentials of CI/CD, Docker, Kubernetes, and infrastructure as code. Set up automated pipelines like a pro.',
    category: 'DevOps',
    price: 1150,
    duration: 10,
    difficulty: 'intermediate',
    modules: 5,
    variant: 'locked',
    requiredLevel: 5,
  },
  {
    title: 'Intro to Blockchain',
    description:
      'Understand how blockchain works, explore smart contracts, and build simple dApps using Ethereum and Solidity.',
    category: 'Web3',
    price: 1300,
    duration: 9,
    difficulty: 'advanced',
    modules: 6,
    variant: 'locked',
    requiredLevel: 10,
  },
];
