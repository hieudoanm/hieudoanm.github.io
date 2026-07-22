import type { FC } from 'react';

import { roundName } from '../constants';
import type { TeamInfo } from '../types';

export const StatusBar: FC<{
  champ: string | null;
  currentLevel: number | null;
  maxLevel: number;
  decided: number;
  total: number;
  progress: number;
  teams: Record<string, TeamInfo>;
}> = ({ champ, currentLevel, maxLevel, decided, total, progress, teams }) => (
  <div className="mx-auto mb-1.5 flex max-w-screen-sm flex-wrap items-center gap-2.5 rounded-full border border-neutral-700 bg-gradient-to-b from-white/5 to-transparent px-4 py-2.5">
    <div className="text-xs text-stone-200">
      {champ ? (
        <span>
          <b className="font-semibold text-amber-300">{teams[champ]?.name}</b>{' '}
          lifts the trophy.
        </span>
      ) : (
        <span>
          <b className="font-semibold text-amber-300">
            {currentLevel ? roundName(currentLevel, maxLevel) : '—'}
          </b>{' '}
          · {decided} / {total} matches decided
        </span>
      )}
    </div>
    <div className="h-1 min-w-20 flex-1 overflow-hidden rounded-full bg-neutral-800">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
