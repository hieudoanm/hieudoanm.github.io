'use client';

import { roleClasses } from '@/lib/pitch';
import { teamStats } from '@/lib/stats';
import { Formation, Squad } from '@/types/football';
import { FC } from 'react';

interface TeamStatsProps {
  squad: Squad;
  formation: Formation;
}

export const TeamStats: FC<TeamStatsProps> = ({ squad, formation }) => {
  const stats = teamStats(squad, formation);
  const pct = (filled: number, total: number): string =>
    total === 0 ? '0%' : `${Math.round((filled / total) * 100)}%`;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Team stats
      </span>

      <div className="border-base-300 rounded-box bg-base-200/40 flex items-center gap-3 border p-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Formation strength</span>
            <span className="badge badge-primary badge-sm">
              {stats.strength}%
            </span>
          </div>
          <div className="bg-base-300 mt-1 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: pct(stats.filled, stats.total) }}
            />
          </div>
          <p className="text-base-content/50 mt-1 text-[10px]">
            {stats.filled} of {stats.total} positions filled ·{' '}
            {stats.unassigned} unassigned
          </p>
        </div>
      </div>

      <ul className="flex list-none flex-col gap-1">
        {stats.coverage.map((item) => (
          <li
            key={item.role}
            className="border-base-300 flex items-center gap-2 rounded border p-1">
            <span
              className={`${roleClasses(item.role)} w-10 rounded border text-center text-[10px] font-bold`}>
              {item.role}
            </span>
            <div className="bg-base-300 h-1.5 min-w-0 flex-1 overflow-hidden rounded-full">
              <div
                className={`${roleClasses(item.role)} h-full rounded-full`}
                style={{ width: pct(item.filled, item.total) }}
              />
            </div>
            <span className="text-base-content/50 w-8 text-right text-[10px]">
              {item.filled}/{item.total}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

TeamStats.displayName = 'TeamStats';
