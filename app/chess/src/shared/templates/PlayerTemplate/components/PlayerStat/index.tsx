'use client';

import { ChessTimeClass } from '@prisma/client';
import { ReactNode } from 'react';

export type PlayerStatProperties = {
  timeClass: ChessTimeClass;
  last: number;
  best: number;
  icon: ReactNode;
};

export const PlayerStat: React.FC<PlayerStatProperties> = ({
  timeClass,
  last = 0,
  best = 0,
  icon = <></>,
}) => {
  return (
    <div className="card border border-gray-200 shadow">
      <div className="stat">
        <div className="stat-title capitalize">{timeClass}</div>
        <div className="stat-value">{last ?? 'N/A'}</div>
        <div className="stat-desc m-0">Best: {best ?? 'N/A'}</div>
        {icon ? (
          <div className="stat-figure">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-teal-500 p-2 text-white">
              {icon}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

PlayerStat.displayName = 'PlayerStat';
