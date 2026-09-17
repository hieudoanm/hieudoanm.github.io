'use client';

import type { FC } from 'react';

import { isStrong } from '../utils';

interface ResultStepProps {
  hits: number;
  totalTargets: number;
  misses: number;
  falseAlarms: number;
  accuracy: number;
  onRestart: () => void;
}

const Stat: FC<{ label: string; value: string; className?: string }> = ({
  label,
  value,
  className = '',
}) => (
  <>
    <span className="opacity-50">{label}</span>
    <span className={className}>{value}</span>
  </>
);

export const ResultStep: FC<ResultStepProps> = ({
  hits,
  totalTargets,
  misses,
  falseAlarms,
  accuracy,
  onRestart,
}) => (
  <div className="flex flex-col items-center gap-2 py-4">
    <div className="text-lg font-normal">
      {isStrong(accuracy) ? 'Great!' : 'Keep practicing'}
    </div>
    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
      <Stat
        label="Hits"
        value={`${hits}/${totalTargets}`}
        className="text-success"
      />
      <Stat label="Misses" value={String(misses)} className="text-error" />
      <Stat
        label="False Alarms"
        value={String(falseAlarms)}
        className="text-warning"
      />
      <Stat label="Accuracy" value={`${(accuracy * 100).toFixed(0)}%`} />
    </div>
    <button onClick={onRestart} className="btn btn-primary btn-sm mt-2">
      Play Again
    </button>
  </div>
);

ResultStep.displayName = 'ResultStep';
