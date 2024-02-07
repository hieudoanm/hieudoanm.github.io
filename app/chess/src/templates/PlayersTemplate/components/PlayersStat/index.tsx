'use client';

import { ReactNode } from 'react';

export const PlayersStat: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: ReactNode;
}> = ({ title = '', average = 0, max = 0, icon }) => {
  return (
    <div className="border border-gray-200 shadow rounded">
      <div className="stat">
        <div className="stat-title">Average {title}</div>
        <div className="stat-value">{average}</div>
        <div className="stat-desc">Highest: {max}</div>
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

PlayersStat.displayName = 'PlayersStat';
