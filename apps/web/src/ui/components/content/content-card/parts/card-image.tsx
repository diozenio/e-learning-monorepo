import { cva } from 'class-variance-authority';
import { Lock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CardImage, CardImageContainer } from '@/ui/primitives/card';

import { ContentCardProps } from '../content-card.types';
import { CategoryBadge } from './category-badge';

const cardImageContainerVariants = cva(
  'transition-all duration-300 ease-in-out group-hover/card:h-32',
  {
    variants: {
      variant: {
        locked: 'transition-none group-hover/card:h-52',
        available: '',
        completed: 'group-hover/card:h-40',
        'in-progress': '',
      },
    },
  }
);

function ContentCardImage({ image, variant, category }: ContentCardProps) {
  const locked = variant === 'locked';

  return (
    <CardImageContainer className={cardImageContainerVariants({ variant })}>
      <CardImage
        src={image ?? '/images/content/content-card-fallback-image.png'}
        alt="Card Image"
        className={cn(locked && '')}
      />

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-black/15 backdrop-blur-[2px]">
          <Lock size={32} className="text-white" />
        </div>
      )}

      <CategoryBadge category={category} />
    </CardImageContainer>
  );
}

export { ContentCardImage };
