export type ContentCardVariant =
  | 'locked'
  | 'available'
  | 'completed'
  | 'in-progress';

export type ContentCardDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  variant?: ContentCardVariant;
  category?: string;
  price?: number;
  duration?: number;
  durationLeft?: number;
  difficulty?: ContentCardDifficulty;
  modules?: number;
  requiredLevel?: number;
  onReadMore?: () => void;
  onBuyCourse?: () => void;
  loading?: boolean;
}
