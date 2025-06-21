import { Badge } from '@/ui/primitives/badge';
import { Card, CardContent, CardImageContainer } from '@/ui/primitives/card';
import { Skeleton } from '@/ui/primitives/skeleton';

function ContentCardSkeleton() {
  return (
    <Card className="hover:bg-card select-none gap-0 p-0 hover:cursor-default">
      <CardImageContainer>
        <Skeleton className="bg-muted h-full w-full rounded-b-none rounded-t-2xl" />
        <Badge
          variant="secondary"
          className="bg-muted absolute -bottom-3.5 left-5 h-7 w-32"
        >
          <Skeleton className="bg-muted-foreground/10 h-2 w-full rounded-sm" />
        </Badge>
      </CardImageContainer>
      <CardContent className="px-5 pb-6 pt-10">
        <div className="flex flex-col gap-4">
          <Skeleton className="bg-muted h-5.5 w-3/4 rounded-sm" />
          <div className="mb-3 space-y-2">
            <Skeleton className="bg-muted h-2.5 w-full rounded-sm" />
            <Skeleton className="bg-muted h-2.5 w-full rounded-sm" />
            <Skeleton className="bg-muted h-2.5 w-full rounded-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ContentCardSkeleton };
