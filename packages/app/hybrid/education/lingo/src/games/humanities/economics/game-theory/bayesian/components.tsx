import { FC } from 'react';
import type { Tally } from './types';
import { TOTAL_TRIALS } from './constants';

interface TallyBarProps {
  tally: Tally;
}

export const TallyBar: FC<TallyBarProps> = ({ tally }) => {
  const switchPct =
    tally.total > 0 ? Math.round((tally.switchWins / tally.total) * 100) : 0;
  const stayPct =
    tally.total > 0 ? Math.round((tally.stayWins / tally.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-2" data-testid="tally-bar">
      <div className="flex items-center justify-between text-sm">
        <span className="text-success font-medium">Switching</span>
        <span>
          {tally.switchWins}/{tally.total} ({switchPct}%)
        </span>
      </div>
      <div className="bg-base-300 h-3 w-full rounded-full">
        <div
          className="bg-success h-3 rounded-full transition-all"
          style={{ width: `${switchPct}%` }}
          data-testid="switch-bar"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-error font-medium">Staying</span>
        <span>
          {tally.stayWins}/{tally.total} ({stayPct}%)
        </span>
      </div>
      <div className="bg-base-300 h-3 w-full rounded-full">
        <div
          className="bg-error h-3 rounded-full transition-all"
          style={{ width: `${stayPct}%` }}
          data-testid="stay-bar"
        />
      </div>
    </div>
  );
};

interface ExplanationPanelProps {
  tally: Tally;
}

export const ExplanationPanel: FC<ExplanationPanelProps> = ({ tally }) => (
  <div
    className="border-base-300 flex flex-col gap-3 rounded-lg border p-4 text-sm"
    data-testid="explanation-panel">
    <h2 className="text-lg font-bold">Why switching wins 2/3 of the time</h2>
    <p className="text-base-content/80 leading-relaxed">
      When you first picked a door, you had a <strong>1/3</strong> chance of
      being right and a <strong>2/3</strong> chance of being wrong.
    </p>
    <p className="text-base-content/80 leading-relaxed">
      <strong>Staying wins</strong> only when your first pick was correct
      (probability 1/3). <strong>Switching wins</strong> only when your first
      pick was wrong (probability 2/3) — the host always reveals a goat, so
      switching lands on the prize.
    </p>
    <p className="text-base-content/80 leading-relaxed">
      The host&rsquo;s reveal doesn&rsquo;t change your original 1/3 odds — it
      concentrates the remaining 2/3 probability onto the single unopened door.
      This is Bayesian updating in action: new evidence (the goat reveal) shifts
      the posterior, but only for the door you didn&rsquo;t pick.
    </p>
    <div className="border-base-300 mt-2 border-t pt-2 text-xs">
      Your results: switching won {tally.switchWins}/{tally.total}, staying won{' '}
      {tally.stayWins}/{tally.total}.
      {tally.total >= TOTAL_TRIALS && (
        <span>
          {' '}
          Over 20 trials, switching should win ≈13 times and staying ≈7 times.
        </span>
      )}
    </div>
  </div>
);
