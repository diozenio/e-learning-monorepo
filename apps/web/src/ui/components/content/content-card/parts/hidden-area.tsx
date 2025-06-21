import { cva } from 'class-variance-authority';
import { Clock } from 'lucide-react';

import { Button } from '@/ui/primitives/button';
import { Progress } from '@/ui/primitives/progress';

import { ContentCardProps } from '../content-card.types';
import { DifficultyInfo } from './difficulty-info';

const hiddenContentVariants = cva(
  'mt-3 flex h-0 flex-col justify-between overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100',
  {
    variants: {
      variant: {
        locked: 'group-hover/card:h-0 group-hover/card:opacity-0 hidden',
        available: 'group-hover/card:h-20',
        completed: 'group-hover/card:h-12',
        'in-progress': 'group-hover/card:h-20',
      },
    },
  }
);

function HiddenArea({
  variant,
  duration = 0,
  durationLeft = 0,
  modules,
  onReadMore,
  onBuyCourse,
  difficulty,
}: ContentCardProps) {
  const available = variant === 'available';
  const inProgress = variant === 'in-progress';
  const completed = variant === 'completed';

  const progress = ((duration - durationLeft) * 100) / duration;

  return (
    <div className={hiddenContentVariants({ variant })}>
      <div className="flex w-full flex-row items-center gap-4">
        {available && (
          <>
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Clock size={14} />
              <span>{duration}H</span>
            </div>

            <DifficultyInfo difficulty={difficulty} />

            <div className="text-muted-foreground ml-auto flex items-center gap-1.5 text-sm">
              <span>{modules} modules</span>
            </div>
          </>
        )}
        {inProgress && (
          <div className="flex w-full flex-row items-center gap-2">
            <Progress value={progress} />
            <span className="text-muted-foreground text-sm">
              {progress.toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid w-full grid-cols-2 gap-4">
        {available && (
          <>
            <Button variant="outline" onClick={onReadMore}>
              Read More
            </Button>
            <Button onClick={onBuyCourse}>Buy Course</Button>
          </>
        )}

        {inProgress && <Button className="col-span-2">Continue Course</Button>}

        {completed && (
          <Button className="col-span-2" variant="outline">
            View Details
          </Button>
        )}
      </div>
    </div>
  );
}

export { HiddenArea };
