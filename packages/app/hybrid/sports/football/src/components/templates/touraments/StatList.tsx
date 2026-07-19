import type { FC } from 'react';

interface StatEntry {
  name: string;
  wins: number;
  years: number[];
}

export const StatList: FC<{ title: string; data: StatEntry[] }> = ({
  title,
  data,
}) => (
  <div>
    <h2 className="mb-4 text-center font-serif text-xl font-bold text-stone-200">
      {title}
    </h2>
    <div className="space-y-1.5">
      {data.map((w) => (
        <div
          key={w.name}
          className="flex items-center justify-between rounded-lg border border-neutral-700 px-4 py-2 text-sm">
          <span className="font-medium text-stone-200">{w.name}</span>
          <span className="text-neutral-400">
            {w.wins}{' '}
            <span className="text-neutral-600">({w.years.join(', ')})</span>
          </span>
        </div>
      ))}
    </div>
  </div>
);
