import { CheckCircle2, Clock, Coins, Lock } from 'lucide-react';

import { ContentCardProps } from '../content-card.types';

function InfoSlot({
  status,
  requiredLevel,
  price,
  durationLeft,
}: ContentCardProps) {
  const locked = status === 'locked';
  const available = status === 'available';
  const inProgress = status === 'in-progress';
  const completed = status === 'completed';

  return (
    <div className="flex items-center gap-1.5 text-nowrap text-sm">
      {locked && (
        <>
          <Lock size={16} className="text-muted-foreground" />
          <span>Level {requiredLevel}</span>
        </>
      )}

      {available &&
        (price && price > 0 ? (
          <>
            <Coins size={16} className="text-muted-foreground" />
            <span>{price}</span>
          </>
        ) : (
          <span>Free</span>
        ))}

      {inProgress && (
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Clock size={14} />
          <span>{durationLeft}h left</span>
        </div>
      )}

      {completed && (
        <CheckCircle2 size={18} className="text-card" fill="var(--primary)" />
      )}
    </div>
  );
}

export { InfoSlot };
