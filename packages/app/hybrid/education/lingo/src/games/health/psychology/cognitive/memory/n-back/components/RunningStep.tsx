'use client';

import type { FC } from 'react';

import { GRID_POSITIONS, GRID_SIZE } from '../constants';
import type { Trial } from '../utils';

interface RunningStepProps {
  trials: Trial[];
  currentIdx: number;
  hits: number;
  showStimulus: boolean;
  onRespond: (response: 'match' | 'no-match') => void;
}

const activePosition = (
  trials: Trial[],
  currentIdx: number,
  showStimulus: boolean
): number | null => {
  if (!showStimulus || currentIdx < 0) return null;

  return trials[currentIdx]?.stimulus.position ?? null;
};

export const RunningStep: FC<RunningStepProps> = ({
  trials,
  currentIdx,
  hits,
  showStimulus,
  onRespond,
}) => {
  const lit = activePosition(trials, currentIdx, showStimulus);
  const letter = lit === null ? '' : trials[currentIdx].stimulus.letter;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between text-xs opacity-50">
        <span>
          {currentIdx + 1}/{trials.length}
        </span>
        <span>Hits: {hits}</span>
      </div>
      <div
        className="grid w-48"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          aspectRatio: '1',
        }}>
        {GRID_POSITIONS.map((position) => (
          <div
            key={position}
            className={[
              'border-base-300 flex items-center justify-center border text-lg',
              'font-normal transition-colors duration-100',
              position === lit
                ? 'bg-primary text-primary-content'
                : 'bg-base-200',
            ].join(' ')}>
            {position === lit ? letter : ''}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onRespond('match')}
          className="btn btn-success btn-sm">
          Match (A)
        </button>
        <button
          onClick={() => onRespond('no-match')}
          className="btn btn-neutral btn-sm">
          No Match (L)
        </button>
      </div>
    </div>
  );
};

RunningStep.displayName = 'RunningStep';
