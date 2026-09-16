import { FC } from 'react';
import { MODE_META, PRIZE, TOTAL_ROUNDS } from './constants';
import type { Mode } from './types';

export const formatCurrency = (n: number): string => {
  const abs = Math.abs(n).toLocaleString('en-US');
  return n < 0 ? `-$${abs}` : `$${abs}`;
};

export const Header: FC<{ round: number; mode: Mode; wins: number }> = ({
  round,
  mode,
  wins,
}) => {
  const meta = MODE_META[mode];
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <span className="flex items-center gap-1 font-bold">
        <span>{meta.emoji}</span>
        {meta.label}
      </span>
      <span>
        Round <strong>{round}</strong> / {TOTAL_ROUNDS}
      </span>
      <span>
        Rounds won: <strong>{wins}</strong>
      </span>
    </div>
  );
};

export const CheckButton: FC<{ disabled?: boolean; onCheck: () => void }> = ({
  disabled = false,
  onCheck,
}) => (
  <button
    type="button"
    onClick={onCheck}
    disabled={disabled}
    data-testid="check"
    className="btn btn-primary btn-sm">
    Check
  </button>
);

export const NextButton: FC<{ label: string; onNext: () => void }> = ({
  label,
  onNext,
}) => (
  <button
    type="button"
    onClick={onNext}
    data-testid="next"
    className="btn btn-secondary btn-sm">
    {label}
  </button>
);

export const DonePanel: FC<{
  wins: number;
  totalWaste: number;
  onReset: () => void;
}> = ({ wins, totalWaste, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4 text-center">
    <div className="text-4xl">🏁</div>
    <div className="text-lg">Voting Power Lab results</div>
    <div className="flex flex-col gap-1 text-sm">
      <span>
        Rounds won: <strong>{wins}</strong> / {TOTAL_ROUNDS}
      </span>
      <span>
        Total lobby spending (waste):{' '}
        <strong>{formatCurrency(totalWaste)}</strong>
      </span>
      <span>
        Prize at stake: <strong>{formatCurrency(PRIZE)}</strong>
      </span>
    </div>
    <p className="text-base-content/60 max-w-md text-xs">
      Lobbying is rent seeking: total spending approaches the prize, so much of
      the subsidy is burned competing for it rather than funding the project.
    </p>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
