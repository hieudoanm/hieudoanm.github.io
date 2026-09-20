import type { FC } from 'react';
import { VERDICT_LABEL } from './constants';
import { bestTrial } from './game';
import type { Trial } from './types';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const formatSigned = (n: number): string =>
  n >= 0 ? `+${formatCurrency(n)}` : `-${formatCurrency(Math.abs(n))}`;

export const TrialTable: FC<{ trials: Trial[] }> = ({ trials }) => (
  <div className="overflow-x-auto">
    <table data-testid="trial-table" className="table-sm table">
      <thead>
        <tr>
          <th>Trial</th>
          <th>Price</th>
          <th>Good cars</th>
          <th>Lemons</th>
          <th>Expected value</th>
          <th>Expected profit</th>
          <th>Verdict</th>
        </tr>
      </thead>
      <tbody>
        {trials.map((trial) => (
          <tr key={trial.id} data-testid={`trial-row-${trial.id}`}>
            <td>{trial.id}</td>
            <td>{formatCurrency(trial.price)}</td>
            <td>{trial.goodsOffered}</td>
            <td>{trial.lemonsOffered}</td>
            <td>{formatCurrency(trial.expectedValue)}</td>
            <td>{formatSigned(trial.expectedProfit)}</td>
            <td>{VERDICT_LABEL[trial.verdict]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TrialTable.displayName = 'TrialTable';

export const SummaryPanel: FC<{ trials: Trial[]; onReset: () => void }> = ({
  trials,
  onReset,
}) => {
  const best = bestTrial(trials);
  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl">🍋</span>
        <span className="text-lg">Market analysis</span>
      </div>
      {best && (
        <div
          data-testid="best-result"
          className="card border-base-content/10 border p-3 text-sm">
          Best result: {formatCurrency(best.price)} →{' '}
          {VERDICT_LABEL[best.verdict]}, expected profit{' '}
          <strong>{formatSigned(best.expectedProfit)}</strong>.
        </div>
      )}
      <TrialTable trials={trials} />
      <div className="text-base-content/80 flex flex-col gap-2 text-sm leading-relaxed">
        <p>
          <strong>The lesson:</strong> you earn money only when you can buy
          lemons cheaply — below their $6,000 average value. Price $6,000 and
          you break even; price higher and lemons overcharge you. To attract
          good cars you must offer $10,000+, but then 80% of the pool is still
          lemons and the pool averages just $7,200 — every sale loses money.
        </p>
        <p>
          <strong>Why:</strong> sellers know their cars, you don&rsquo;t.
          Without signals, inspections, or warranties to separate good cars from
          lemons, good cars refuse to sell at &ldquo;fair&rdquo; prices and the
          market unravels into a market for lemons.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onReset}
          data-testid="reset"
          className="btn btn-primary btn-sm">
          Play Again
        </button>
      </div>
    </div>
  );
};

SummaryPanel.displayName = 'SummaryPanel';
