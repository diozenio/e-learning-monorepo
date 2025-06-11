import { cn } from '@/lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

function Divider({ className, children, label }: DividerProps) {
  return (
    <div
      className={cn(
        'before:bg-border after:bg-border flex items-center before:h-px before:flex-1 after:h-px after:flex-1',
        className,
        (label || children) && 'gap-3'
      )}
    >
      {label && <span className="text-muted-foreground text-xs">{label}</span>}
      {children}
    </div>
  );
}

export { Divider };
