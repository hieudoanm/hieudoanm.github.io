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
        <div className="capitalize stat-title">{timeClass}</div>
        <div className="stat-value">{last ?? 'N/A'}</div>
        <div className="stat-desc m-0">Best: {best ?? 'N/A'}</div>
        {icon ? (
          <div className="stat-figure">
            <div className="rounded p-2 text-white bg-teal-500 w-12 h-12 flex items-center justify-center">
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
