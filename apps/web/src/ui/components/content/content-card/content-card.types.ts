import { Course } from '@/core/domain/models/catalog';

export interface ContentCardProps extends Course {
  onBuyCourse?: () => void;
  loading?: boolean;
}
