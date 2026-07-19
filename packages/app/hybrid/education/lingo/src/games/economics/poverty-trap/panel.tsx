import { FC } from 'react';
import { MAX_TRANSFER, MIN_TRANSFER } from './constants';
import type { Scenario } from './types';

export const PolicyPanel: FC<{
  challenge: Scenario;
  transfer: number;
  guess: number;
  minTransfer: number;
  score: number;
  round: number;
  totalRounds: number;
  escaped: boolean;
  answered: boolean;
  correct: boolean;
  onTransfer: (v: number) => void;
  onGuess: (v: number) => void;
  onEscapeNow: () => void;
  onCheck: () => void;
  onNext: () => void;
  onReset: () => void;
}> = ({
  challenge,
  transfer,
  guess,
  minTransfer,
  score,
  round,
  totalRounds,
  escaped,
  answered,
  correct,
  onTransfer,
  onGuess,
  onEscapeNow,
  onCheck,
  onNext,
  onReset,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <div className="flex items-center justify-between text-sm">
      <span>
        Challenge <strong>{round}</strong> / {totalRounds}
      </span>
      <span>
        Score: <strong data-testid="score">{score}</strong>
      </span>
    </div>
    <p className="text-base-content/60 text-sm">
      This household starts at K₀ = {challenge.initialCapital} with a savings
      rate of {challenge.savingsRate} and subsistence {challenge.subsistence}.
      Design the smallest one-off transfer that triggers escape.
    </p>
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>Cash transfer</span>
        <strong data-testid="transfer-value">{transfer}</strong>
      </div>
      <input
        type="range"
        min={MIN_TRANSFER}
        max={MAX_TRANSFER}
        step={1}
        value={transfer}
        onChange={(e) => onTransfer(Number(e.target.value))}
        data-testid="transfer"
        className="range range-primary range-xs"
      />
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onEscapeNow}
        className="btn btn-sm"
        data-testid="escape-now">
        Escape now
      </button>
      {escaped && (
        <span className="text-success text-sm">
          This transfer escapes the trap ✓
        </span>
      )}
    </div>
    {answered && (
      <p className="text-sm" data-testid="transfer-needed">
        Minimum transfer needed: <strong>{minTransfer}</strong>
      </p>
    )}
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="range"
        min={MIN_TRANSFER}
        max={MAX_TRANSFER}
        step={1}
        value={guess}
        onChange={(e) => onGuess(Number(e.target.value))}
        data-testid="guess"
        className="range range-primary range-xs flex-1"
      />
      <button
        type="button"
        onClick={onCheck}
        className="btn btn-primary btn-sm"
        data-testid="check">
        Check guess
      </button>
    </div>
    {answered && (
      <p
        className={correct ? 'text-success text-sm' : 'text-error text-sm'}
        data-testid="result">
        {correct
          ? 'Correct! Efficient transfer.'
          : 'Not quite — adjust and retry.'}
      </p>
    )}
    <div className="flex flex-wrap items-center gap-2">
      {answered && round < totalRounds && (
        <button type="button" onClick={onNext} className="btn btn-sm">
          Next challenge
        </button>
      )}
      <button
        type="button"
        onClick={onReset}
        className="btn btn-sm"
        data-testid="reset">
        Reset
      </button>
    </div>
  </div>
);
