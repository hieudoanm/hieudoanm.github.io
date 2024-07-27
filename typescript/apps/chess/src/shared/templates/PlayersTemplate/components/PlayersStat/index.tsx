'use client';

import { ReactNode } from 'react';

export const PlayersStat: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: ReactNode;
}> = ({ title = '', average = 0, max = 0, icon }) => {
  return (
    <div className="rounded border border-gray-200 shadow">
      <div className="flex items-center justify-between">
        <div className="stat">
          <div className="stat-title">Average {title}</div>
          <div className="stat-value">{average}</div>
          <div className="stat-desc">Highest: {max}</div>
        </div>
        {icon ? (
          <div className="p-4">
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

PlayersStat.displayName = 'PlayersStat';
