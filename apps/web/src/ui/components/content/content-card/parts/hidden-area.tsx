import { cva } from 'class-variance-authority';
import { BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/primitives/accordion';
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
import { Divider } from '@/ui/primitives/divider';
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
              <span>
                {modules?.length} {modules?.length === 1 ? 'module' : 'modules'}
              </span>
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
              <DialogContent
                className="max-h-[95vh] gap-0 overflow-y-auto p-0"
                showCloseButton={false}
              >
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
                <div className="w-full p-6">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold">Course Details</h3>
                    <div className="flex w-full flex-row items-center gap-4">
                      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                        <Clock size={14} />
                        <span>{duration}H</span>
                      </div>
                      <DifficultyInfo difficulty={difficulty} />
                      <div className="text-muted-foreground ml-auto flex items-center gap-1.5 text-sm">
                        <span>
                          {modules?.length}{' '}
                          {modules?.length === 1 ? 'module' : 'modules'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-semibold">Modules</h3>
                    <div className="space-y-1.5">
                      {modules &&
                        modules.length > 0 &&
                        modules?.map((module) => (
                          <Accordion
                            type="single"
                            className="rounded border"
                            collapsible
                            key={module.id}
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger className="items-center px-3 py-2 hover:cursor-pointer">
                                <div className="flex flex-row items-center gap-2">
                                  <span>
                                    <BookOpen className="size-4" />
                                  </span>
                                  <p>{module.title}</p>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pb-2">
                                <Divider />
                                <ul className="mt-2 list-decimal space-y-1.5 px-8">
                                  {module.lessons &&
                                    module.lessons.map((lesson) => (
                                      <li key={lesson.id}>{lesson.title}</li>
                                    ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                    </div>
                  </div>
                  <DialogFooter className="mt-8 sm:justify-between">
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
