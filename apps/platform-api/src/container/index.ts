import { CoursesController, GetCoursesUseCase } from '@/modules';

// Repositories
// Add the necessary imports for repositories

// Use Cases
const getCoursesUseCase = new GetCoursesUseCase();

// Controllers
const getCoursesController = new CoursesController(getCoursesUseCase);

export const container = {
  getCoursesController,
};
