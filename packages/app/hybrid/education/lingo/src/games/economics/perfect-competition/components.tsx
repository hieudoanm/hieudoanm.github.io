import { FC } from 'react';
import { MIN_AC_LABEL, TOTAL_ROUNDS } from './constants';
import type { RoundResult } from './types';

export const RevealCard: FC<{ result: RoundResult; onNext: () => void }> = ({
  result,
  onNext,
}) => {
  const optimal = result.chosenQ === result.optimalQ;
  return (
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{result.round}</strong>
        </span>
        <span>
          Market price:{' '}
          <strong className="text-primary">${result.price}</strong>
        </span>
        <span>
          Your output: <strong>{result.chosenQ}</strong>
        </span>
        <span>
          Profit-max q*: <strong>{result.optimalQ}</strong>
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span
          data-testid="profit-value"
          className={result.profit >= 0 ? 'text-success' : 'text-error'}>
          Profit: ${result.profit}
        </span>
        <span className={optimal ? 'text-success' : 'text-error'}>
          {optimal ? '✓ Optimal (P = MC)' : 'P = MC not met — adjust output'}
        </span>
      </div>
      <div className="text-base-content/60 text-xs">
        {result.operating
          ? 'Operating: price exceeds the shut-down threshold (min AVC = 8).'
          : 'Shut down: price is below min AVC — do not operate.'}
      </div>
      <div className="text-base-content/70 border-base-200 rounded-lg border p-2 text-xs">
        Long-run: {longRunText(result.longRun)}
      </div>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

const longRunText = (state: string): string => {
  switch (state) {
    case 'entry':
      return `P above min AC (≈ $${MIN_AC_LABEL}) → entry attracted, price will fall.`;
    case 'exit':
      return `P below min AC (≈ $${MIN_AC_LABEL}) → firms exit, price will rise.`;
    default:
      return `P at min AC (≈ $${MIN_AC_LABEL}) → long-run equilibrium, zero profit.`;
  }
};

export const SummaryCard: FC<{
  results: RoundResult[];
  totalProfit: number;
  optimalCount: number;
  onReset: () => void;
}> = ({ results, totalProfit, optimalCount, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Results</div>
    <div className="flex flex-wrap justify-center gap-6 text-sm">
      <span>
        Total profit: <strong>${totalProfit}</strong>
      </span>
      <span>
        Profitable rounds:{' '}
        <strong>
          {results.filter((r) => r.profit > 0).length} / {results.length}
        </strong>
      </span>
      <span>
        Optimal output (P=MC):{' '}
        <strong>
          {optimalCount} / {results.length}
        </strong>
      </span>
    </div>
    <p className="text-base-content/60 max-w-md text-center text-xs">
      In the long run, free entry and exit drive the price to the minimum of
      average total cost (≈ ${MIN_AC_LABEL}). With P at min AC, economic profit
      falls to zero — a hallmark of perfect competition.
    </p>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
