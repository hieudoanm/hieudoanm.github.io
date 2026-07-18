import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const AchievementUnlocked: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Achievement Name';
  const game = (data.game as string) ?? 'Game Title';
  const description =
    (data.description as string) ?? 'Complete a difficult challenge';
  const rarity = (data.rarity as string) ?? 'Rare';
  const dateUnlocked = (data.dateUnlocked as string) ?? 'Jan 1, 2026';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="bg-accent/10 mb-1 flex h-8 w-8 items-center justify-center rounded-full">
        <span className="text-3xl">🏆</span>
      </div>
      <h1 className="text-accent mb-0.5 text-4xl font-extrabold">{title}</h1>
      <p className="text-neutral mb-1.5 text-xs font-medium">{game}</p>
      <p className="text-base-content mb-1 max-w-[280px] text-xs leading-relaxed">
        {description}
      </p>
      <span className="bg-primary/10 text-primary mb-1 rounded-full px-2 py-0.5 text-xs font-bold">
        {rarity}
      </span>
      <p className="text-base-300 text-xs">
        Unlocked <time>{dateUnlocked}</time>
      </p>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

AchievementUnlocked.displayName = 'AchievementUnlocked';
