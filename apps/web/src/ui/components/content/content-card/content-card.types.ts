import { Course } from '@/core/domain/models/catalog';

export interface ContentCardProps extends Course {
  onReadMore?: () => void;
  onBuyCourse?: () => void;
  loading?: boolean;
}
