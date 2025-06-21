import { Badge } from '@/ui/primitives/badge';

import { ContentCardProps } from '../content-card.types';

function CategoryBadge({ category }: Pick<ContentCardProps, 'category'>) {
  if (!category) return null;

  return (
    <Badge
      variant="secondary"
      className="border- absolute -bottom-3.5 left-5 h-7"
    >
      {category}
    </Badge>
  );
}

export { CategoryBadge };
