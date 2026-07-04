import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Stat {
  label: string;
  value: string;
}

export const StatTracker: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Season Stats';
  const game = (data.game as string) ?? 'Game Title';
  const stats =
    (data.stats as Stat[]) ??
    ([
      { label: 'Wins', value: '142' },
      { label: 'Losses', value: '38' },
    ] as Stat[]);
  const highlight = (data.highlight as string) ?? 'Top 1%';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-neutral mb-4 text-xs font-medium">{game}</p>
      <div className="mb-5 grid w-full grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-base-200 rounded-lg px-4 py-3">
            <p className="text-primary text-xl font-extrabold">{stat.value}</p>
            <p className="text-base-300 mt-1 text-[10px] font-semibold tracking-wider uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <span className="bg-accent/10 text-accent rounded-full px-5 py-1.5 text-sm font-bold">
        {highlight}
      </span>
    </div>
  );
};

StatTracker.displayName = 'StatTracker';
