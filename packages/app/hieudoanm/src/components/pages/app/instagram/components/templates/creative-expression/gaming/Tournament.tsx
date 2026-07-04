import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Result {
  position: string;
  team: string;
  score: string;
}

const medals: Record<string, string> = {
  '1': '🥇',
  '2': '🥈',
  '3': '🥉',
};

export const Tournament: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Tournament Results';
  const game = (data.game as string) ?? 'Game Title';
  const date = (data.date as string) ?? 'Jan 1, 2026';
  const results =
    (data.results as Result[]) ??
    ([
      { position: '1', team: 'Team Alpha', score: '16' },
      { position: '2', team: 'Team Beta', score: '12' },
    ] as Result[]);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-accent text-xl font-extrabold">{title}</span>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <span className="bg-accent/10 text-accent rounded-full px-3 py-0.5 text-[10px] font-bold">
          {game}
        </span>
        <span className="text-base-300 text-[10px]">{date}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {results.map((result, i) => (
          <div
            key={i}
            className="bg-base-200 flex items-center rounded-lg px-4 py-3">
            <span className="mr-3 text-lg">
              {medals[result.position] ?? `#${result.position}`}
            </span>
            <span className="text-base-content flex-1 text-sm font-bold">
              {result.team}
            </span>
            <span className="text-primary text-lg font-extrabold">
              {result.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Tournament.displayName = 'Tournament';
