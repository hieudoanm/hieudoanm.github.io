import type { FC } from 'react';
import { PATHS, TOLERANCE } from './constants';
import { impliedCross } from './game';
import type { FxRates, RoundResult } from './types';

export const formatUsd = (n: number): string =>
  `$${n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatProfit = (n: number): string =>
  n >= 0 ? `+${formatUsd(n)}` : `-${formatUsd(Math.abs(n))}`;

const toSpread = (ratio: number): string =>
  `${((ratio - 1) * 100).toFixed(2)}%`;

export const RateTable: FC<{ rates: FxRates; ratio: number }> = ({
  rates,
  ratio,
}) => {
  const beyond = Math.abs(ratio - 1) > TOLERANCE;
  const rows: { token: string; rate: number }[] = [
    { token: 'USD/EUR', rate: rates.usdPerEur },
    { token: 'JPY/USD', rate: rates.jpyPerUsd },
    { token: 'EUR/JPY quoted', rate: rates.quotedCross },
    {
      token: 'EUR/JPY implied',
      rate: impliedCross(rates.usdPerEur, rates.jpyPerUsd),
    },
  ];
  return (
    <div className="card border-base-content/10 border p-4">
      <div className="flex flex-col gap-1 text-sm">
        {rows.map((row) => (
          <div
            key={row.token}
            className="border-base-200 flex justify-between border-b py-1 last:border-0">
            <span data-testid="token">{row.token}</span>
            <span data-testid="rate" className="font-mono">
              {row.rate.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
      <div className="text-base-content/70 mt-2 text-sm">
        <span
          data-testid="arb-spread"
          className={beyond ? 'text-success' : 'text-base-content/70'}>
          Arb spread {toSpread(ratio)}
          {beyond ? ' — beyond tolerance' : ' — within tolerance'}
        </span>
      </div>
    </div>
  );
};

export const ResultCard: FC<{
  result: RoundResult;
  isLast: boolean;
  onNext: () => void;
}> = ({ result, isLast, onNext }) => {
  const { pathId, profit, finalUsd, rates } = result;
  const held = pathId === 'direct';
  const won = profit > 0;
  const emblem = held ? '🪙' : won ? '💸' : '📉';
  const headline = held
    ? 'No trade — cash held'
    : won
      ? 'Captured the spread'
      : 'Traded the wrong direction';
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-6">
      <div className="text-3xl">{emblem}</div>
      <div className="text-lg">{headline}</div>
      <div className="text-base-content/80 flex flex-col gap-1 text-sm">
        <span>
          Path <strong>{PATHS[pathId].label}</strong> — {PATHS[pathId].routes}
        </span>
        <span
          data-testid="profit"
          className={won ? 'text-success' : held ? '' : 'text-error'}>
          Profit: <strong>{formatProfit(profit)}</strong>
        </span>
        <span>Final balance: {formatUsd(finalUsd)}</span>
        <span>
          Implied cross {result.impliedCross.toFixed(3)} vs quoted{' '}
          {rates.quotedCross.toFixed(3)} · best {PATHS[result.bestPath].label}{' '}
          {formatProfit(result.arbitrageProfit)}
        </span>
      </div>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {isLast ? 'See Results' : 'Next Triangle'}
      </button>
    </div>
  );
};

export const HistoryLog: FC<{ results: RoundResult[] }> = ({ results }) => (
  <div
    data-testid="log"
    className="border-base-200 w-full max-w-sm rounded-lg border">
    {results.map((r) => (
      <div
        key={r.round}
        className="flex items-center justify-between border-b py-1 text-sm last:border-0">
        <span>
          R{r.round} {PATHS[r.pathId].label}
        </span>
        <span
          className={
            r.profit > 0 ? 'text-success' : r.profit < 0 ? 'text-error' : ''
          }>
          {formatProfit(r.profit)}
        </span>
      </div>
    ))}
  </div>
);

export const DoneCard: FC<{
  results: RoundResult[];
  totalProfit: number;
  onReset: () => void;
}> = ({ results, totalProfit, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Lab results</div>
    <span data-testid="profit">
      Total profit:{' '}
      <strong className={totalProfit >= 0 ? 'text-success' : 'text-error'}>
        {formatProfit(totalProfit)}
      </strong>
    </span>
    <HistoryLog results={results} />
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
