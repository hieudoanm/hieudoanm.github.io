'use client';

import { formatMatchTime, matchPhase, phaseLabel } from '@/lib/clock';
import { FC } from 'react';
import { FiPause, FiPlay, FiRotateCcw, FiClock } from 'react-icons/fi';

interface MatchClockProps {
  running: boolean;
  elapsed: number;
  onToggleStart: () => void;
  onReset: () => void;
}

export const MatchClock: FC<MatchClockProps> = ({
  running,
  elapsed,
  onToggleStart,
  onReset,
}) => {
  const phase = matchPhase(elapsed);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base-content/50 flex items-center gap-1 text-xs font-bold uppercase">
          <FiClock className="size-3" />
          Match clock
        </span>
        <span className="badge badge-outline badge-xs">
          {phaseLabel(phase)}
        </span>
      </div>

      <p
        aria-label="Match time"
        className="text-primary font-mono text-3xl font-bold tabular-nums">
        {formatMatchTime(elapsed)}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-label={running ? 'Pause match clock' : 'Start match clock'}
          onClick={onToggleStart}
          className="btn btn-primary btn-sm gap-1.5">
          {running ? (
            <FiPause className="size-3.5" />
          ) : (
            <FiPlay className="size-3.5" />
          )}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          type="button"
          aria-label="Reset match clock"
          onClick={onReset}
          className="btn btn-ghost btn-sm gap-1.5">
          <FiRotateCcw className="size-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
};

MatchClock.displayName = 'MatchClock';
