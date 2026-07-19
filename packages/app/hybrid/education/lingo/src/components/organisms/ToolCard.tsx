import { FC } from 'react';
import { AccentBadge } from '@/components/atoms/AccentBadge';
import { DifficultyBadge } from '@/components/atoms/DifficultyBadge';
import { CardActions } from '@/components/molecules/CardActions';
import { CourseItem } from '@/lib/catalog';

export interface ToolCardProps {
  item: CourseItem;
}

export const ToolCard: FC<ToolCardProps> = ({ item }) => {
  const {
    label,
    description: itemDescription,
    icon: Icon,
    href,
    badge,
    category,
    difficulty,
  } = item;
  return (
    <div
      data-testid={`tool-card-${href.replaceAll('/', '')}`}
      className="card border-base-content/10 hover:border-primary border transition-colors">
      <div className="card-body items-center gap-2 text-center">
        <Icon className="text-primary text-4xl" />
        <h2 className="card-title text-lg">{label}</h2>
        <p className="text-base-content/60 text-xs">{itemDescription}</p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1">
          {category && (
            <span className="badge badge-outline badge-sm text-[10px]">
              {category}
            </span>
          )}
          {difficulty && <DifficultyBadge difficulty={difficulty} />}
          {badge && <AccentBadge label={badge} />}
        </div>
        <CardActions href={href} gameHref={item.gameHref} />
      </div>
    </div>
  );
};

ToolCard.displayName = 'ToolCard';
