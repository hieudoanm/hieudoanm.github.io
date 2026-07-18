import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background, Footer } from '../../_shared';

interface Entry {
  rank: number;
  name: string;
  score: string;
  medal?: string;
}

const DEFAULT_MEDALS = ['🥇', '🥈', '🥉'];

export const Leaderboard: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Leaderboard';
  const entries = (data.entries as Entry[]) ?? [
    { rank: 1, name: 'Alice', score: '2,450' },
    { rank: 2, name: 'Bob', score: '2,120' },
    { rank: 3, name: 'Carol', score: '1,890' },
    { rank: 4, name: 'Dave', score: '1,650' },
    { rank: 5, name: 'Eve', score: '1,420' },
  ];
  const citation = (data.citation as string) ?? '';

  return (
    <Background>
      <h2 className="text-base-content mb-4 text-center text-sm font-bold">
        {title}
      </h2>
      <ol className="flex flex-1 flex-col gap-2">
        {entries.map((entry, i) => {
          const medal =
            entry.medal ??
            (entry.rank <= 3 ? DEFAULT_MEDALS[entry.rank - 1] : undefined);
          const citation = (data.citation as string) ?? '';

          return (
            <li
              key={i}
              className={`flex items-center gap-4 rounded-2xl px-4 py-2 ${
                i % 2 === 0 ? 'bg-base-200/50' : ''
              }`}>
              <span className="text-neutral w-6 text-right text-sm font-bold">
                {entry.rank}
              </span>
              {medal && <span className="text-sm">{medal}</span>}
              <span className="text-base-content flex-1 text-sm font-bold">
                {entry.name}
              </span>
              <span className="text-primary text-sm font-bold">
                {entry.score}
              </span>
            </li>
          );
        })}
      </ol>
      <Footer citation={citation} />
    </Background>
  );
};

Leaderboard.displayName = 'Leaderboard';
