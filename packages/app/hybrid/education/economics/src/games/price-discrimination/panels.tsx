import { FC } from 'react';
import { formatProfit } from './components';
import { GUIDANCE, TOTAL_ROUNDS } from './constants';
import { optimalDual, optimalSingle, roundFlipped } from './game';
import type { RoundResult } from './types';

export const RevealPanel: FC<{
  result: RoundResult;
  onNext: () => void;
}> = ({ result, onNext }) => {
  const flipped = roundFlipped(result.round);
  const singleOpt = optimalSingle(flipped);
  const dualOpt = optimalDual(flipped);
  const benchmark =
    result.mode === 'single' ? singleOpt.profit : dualOpt.profit;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4 text-sm">
      <div className="flex flex-wrap gap-4">
        <span>
          q_b: <strong data-testid="reveal-qb">{result.qb}</strong>
        </span>
        <span>
          q_l: <strong data-testid="reveal-ql">{result.ql}</strong>
        </span>
        <span>
          Revenue:{' '}
          <strong data-testid="reveal-revenue">
            {formatProfit(result.revenue)}
          </strong>
        </span>
        <span>
          Cost:{' '}
          <strong data-testid="reveal-cost">{formatProfit(result.cost)}</strong>
        </span>
        <span>
          Profit:{' '}
          <strong data-testid="reveal-profit">
            {formatProfit(result.profit)}
          </strong>
        </span>
      </div>
      <div className="text-base-content/60 text-xs">
        <p>
          One-price benchmark: {formatProfit(singleOpt.profit)} · Two-price
          benchmark: {formatProfit(dualOpt.profit)}
        </p>
        <p>
          Your profit{' '}
          {result.beatBenchmark ? 'matched or beat' : 'fell short of'} the best{' '}
          {result.mode === 'single' ? 'one-price' : 'two-price'} profit.
        </p>
        {result.foundOptimal && (
          <p className="text-success">
            {result.mode === 'single'
              ? 'Exact single-price optimum.'
              : 'Within tolerance of the two-price optimum.'}
          </p>
        )}
      </div>
      <p className="text-base-content/70 text-xs" data-testid="guidance">
        {GUIDANCE}
      </p>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

export const ResultsPanel: FC<{
  totalProfit: number;
  pdTotal: number;
  onReset: () => void;
}> = ({ totalProfit, pdTotal, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4 text-center">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Segment Pricing results</div>
    <div className="flex gap-6 text-sm">
      <span>
        Your profit:{' '}
        <strong data-testid="final-profit">{formatProfit(totalProfit)}</strong>
      </span>
      <span>
        Price-discrimination benchmark:{' '}
        <strong data-testid="final-pd">{formatProfit(pdTotal)}</strong>
      </span>
    </div>
    <p className="text-base-content/60 max-w-md text-xs">
      Two-price (third-degree) discrimination raises the take by charging the
      less elastic Business segment more and the elastic Leisure segment less.
      Compared with one uniform price, that captures surplus that would
      otherwise stay with customers and shrinks deadweight loss.
    </p>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
