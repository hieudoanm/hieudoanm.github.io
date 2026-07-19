import { FC } from 'react';
import { Difficulty, difficultyStyles } from '@/lib/catalog';

export const DifficultyBadge: FC<{ difficulty: Difficulty }> = ({
  difficulty,
}) => (
  <span
    className={`badge badge-outline badge-sm text-[10px] ${difficultyStyles[difficulty]}`}>
    {difficulty}
  </span>
);

DifficultyBadge.displayName = 'DifficultyBadge';
