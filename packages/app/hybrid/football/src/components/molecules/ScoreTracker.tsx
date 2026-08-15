'use client';

import { FC } from 'react';
import { FiMinus, FiPlus, FiTarget } from 'react-icons/fi';

interface ScoreTrackerProps {
  goalsFor: number;
  goalsAgainst: number;
  onGoal: () => void;
  onConcede: () => void;
  onUndoGoal: () => void;
  onUndoConcede: () => void;
}

const ScoreSide: FC<{
  label: string;
  value: number;
  valueLabel: string;
  onIncrement: () => void;
  onDecrement: () => void;
  incrementLabel: string;
  decrementLabel: string;
}> = ({
  label,
  value,
  valueLabel,
  onIncrement,
  onDecrement,
  incrementLabel,
  decrementLabel,
}) => (
  <div className="flex flex-1 flex-col gap-1">
    <span className="text-base-content/50 text-xs font-bold uppercase">
      {label}
    </span>
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        aria-label={decrementLabel}
        onClick={onDecrement}
        className="btn btn-ghost btn-sm">
        <FiMinus className="size-3.5" />
      </button>
      <span
        aria-label={valueLabel}
        className="text-primary font-mono text-3xl font-bold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label={incrementLabel}
        onClick={onIncrement}
        className="btn btn-primary btn-sm">
        <FiPlus className="size-3.5" />
      </button>
    </div>
  </div>
);

export const ScoreTracker: FC<ScoreTrackerProps> = ({
  goalsFor,
  goalsAgainst,
  onGoal,
  onConcede,
  onUndoGoal,
  onUndoConcede,
}) => (
  <div className="rounded-box border border-white/10 p-2">
    <span className="text-base-content/50 flex items-center gap-1 text-xs font-bold uppercase">
      <FiTarget className="size-3" />
      Score
    </span>
    <div className="mt-1 flex gap-2">
      <ScoreSide
        label="For"
        value={goalsFor}
        valueLabel="Goals for"
        onIncrement={onGoal}
        onDecrement={onUndoGoal}
        incrementLabel="Increase goals for"
        decrementLabel="Decrease goals for"
      />
      <div className="divider divider-horizontal" />
      <ScoreSide
        label="Against"
        value={goalsAgainst}
        valueLabel="Goals against"
        onIncrement={onConcede}
        onDecrement={onUndoConcede}
        incrementLabel="Increase goals against"
        decrementLabel="Decrease goals against"
      />
    </div>
  </div>
);

ScoreTracker.displayName = 'ScoreTracker';
