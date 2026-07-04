import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const StreakCounter: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'Learning Streak';
  const streak = (data.streak as string) ?? '42';
  const label = (data.label as string) ?? 'days';
  const started = (data.started as string) ?? 'Started Feb 15, 2025';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        {headline}
      </span>

      <div className="text-primary mt-4 text-6xl font-black">{streak}</div>
      <span className="text-neutral mt-1 text-sm font-medium">{label}</span>

      <div className="bg-primary/10 mt-4 flex items-center gap-2 rounded-full px-4 py-2">
        <span className="text-lg">🔥</span>
        <span className="text-primary text-xs font-bold">Active Streak</span>
      </div>

      <span className="text-neutral mt-5 text-[10px]">{started}</span>
    </div>
  );
};

StreakCounter.displayName = 'StreakCounter';
