import { Flame, LucideIcon, Puzzle, Sprout } from 'lucide-react';

import { ContentCardDifficulty, ContentCardProps } from '../content-card.types';

type Info = {
  icon: LucideIcon;
  label: string;
};

const iconMap: Record<ContentCardDifficulty, Info> = {
  beginner: {
    icon: Sprout,
    label: 'Beginner',
  },
  intermediate: {
    icon: Puzzle,
    label: 'Intermediate',
  },
  advanced: {
    icon: Flame,
    label: 'Advanced',
  },
};

function DifficultyInfo({
  difficulty = 'intermediate',
}: Pick<ContentCardProps, 'difficulty'>) {
  const Icon = iconMap[difficulty]?.icon;
  const label = iconMap[difficulty]?.label;

  if (!Icon || !label) return null;

  return (
    <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
      <Icon size={14} />
      <span>{label}</span>
    </div>
  );
}

export { DifficultyInfo };
