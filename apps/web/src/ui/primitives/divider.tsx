import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

function Divider({ className, children, label }: DividerProps) {
  return (
    <div
      className={cn(
        "flex items-center before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
        className,
        (label || children) && "gap-3"
      )}
    >
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      {children}
    </div>
  );
}

export { Divider };
