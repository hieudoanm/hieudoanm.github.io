import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const AchievementUnlocked: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Achievement Name';
  const game = (data.game as string) ?? 'Game Title';
  const description =
    (data.description as string) ?? 'Complete a difficult challenge';
  const rarity = (data.rarity as string) ?? 'Rare';
  const dateUnlocked = (data.dateUnlocked as string) ?? 'Jan 1, 2026';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="bg-accent/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
        <span className="text-3xl">🏆</span>
      </div>
      <h1 className="text-accent mb-1 text-2xl font-extrabold">{title}</h1>
      <p className="text-neutral mb-3 text-xs font-medium">{game}</p>
      <p className="text-base-content mb-4 max-w-[280px] text-sm leading-relaxed">
        {description}
      </p>
      <span className="bg-primary/10 text-primary mb-2 rounded-full px-4 py-1 text-[10px] font-bold">
        {rarity}
      </span>
      <p className="text-base-300 text-[10px]">Unlocked {dateUnlocked}</p>
    </div>
  );
};

AchievementUnlocked.displayName = 'AchievementUnlocked';
