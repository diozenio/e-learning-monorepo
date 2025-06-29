import { cva } from 'class-variance-authority';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/primitives/card';

import { ContentCardProps } from './content-card.types';
import {
  ContentCardImage,
  ContentCardSkeleton,
  HiddenArea,
  InfoSlot,
} from './parts';

const cardVariants = cva('gap-0 p-0 hover:cursor-pointer', {
  variants: {
    status: {
      locked: 'hover:cursor-default select-none',
      available: '',
      completed: '',
      'in-progress': 'border-primary',
    },
  },
});

function ContentCard(props: ContentCardProps) {
  const { title, description, status = 'locked', loading = false } = props;

  if (loading) return <ContentCardSkeleton />;

  return (
    <Card className={cardVariants({ status })}>
      <ContentCardImage {...props} />
      <CardContent className="px-5 pb-6 pt-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between gap-2">
            <CardTitle
              className="!line-clamp-1 flex flex-row items-center gap-2"
              title={title}
            >
              {title}
            </CardTitle>
            <InfoSlot {...props} />
          </div>

          <CardDescription className="line-clamp-3" title={description}>
            {description}
          </CardDescription>
        </div>
        <HiddenArea {...props} />
      </CardContent>
    </Card>
  );
}

export { ContentCard };
