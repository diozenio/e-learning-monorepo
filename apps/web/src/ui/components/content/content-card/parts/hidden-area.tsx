import { cva } from 'class-variance-authority';
import { Clock } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/ui/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/primitives/dialog';
import { Progress } from '@/ui/primitives/progress';

import { ContentCardProps } from '../content-card.types';
import { DifficultyInfo } from './difficulty-info';

const hiddenContentVariants = cva(
  'mt-3 flex h-0 flex-col justify-between overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover/card:opacity-100',
  {
    variants: {
      status: {
        locked: 'group-hover/card:h-0 group-hover/card:opacity-0 hidden',
        available: 'group-hover/card:h-20',
        completed: 'group-hover/card:h-12',
        'in-progress': 'group-hover/card:h-20',
      },
    },
  }
);

function HiddenArea({
  status,
  duration = 0,
  durationLeft = 0,
  modules,
  onBuyCourse,
  difficulty,
  image,
  title,
  description,
}: ContentCardProps) {
  const available = status === 'available';
  const inProgress = status === 'in-progress';
  const completed = status === 'completed';

  const progress = ((duration - durationLeft) * 100) / duration;

  return (
    <div className={hiddenContentVariants({ status })}>
      <div className="flex w-full flex-row items-center gap-4">
        {available && (
          <>
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Clock size={14} />
              <span>{duration}H</span>
            </div>

            <DifficultyInfo difficulty={difficulty} />

            <div className="text-muted-foreground ml-auto flex items-center gap-1.5 text-sm">
              <span>{modules?.length} modules</span>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Read More</Button>
              </DialogTrigger>
              <DialogContent className="gap-0 p-0" showCloseButton={false}>
                <div className="bg-muted relative h-56 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={
                      image ?? '/images/content/content-card-fallback-image.png'
                    }
                    alt={title ?? 'Course Image'}
                    layout="fill"
                    className="relative w-full object-cover"
                  />
                </div>
                <div className="w-full space-y-2 p-6">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="button">Buy Course</Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>

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
