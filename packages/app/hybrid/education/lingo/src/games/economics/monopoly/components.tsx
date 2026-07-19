import { FC } from 'react';
import {
  COMPETITIVE_PRICE,
  COMPETITIVE_Q,
  DWL_MONOPOLY,
  PROFIT_MAX,
  PROFIT_MAX_PRICE,
  PROFIT_MAX_Q,
  TOTAL_ROUNDS,
} from './constants';
import type { Guidance, RoundResult } from './types';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const GUIDANCE_LABEL: Record<Guidance, string> = {
  'below-optimum': 'Below Optimum',
  'above-optimum': 'Above Optimum',
  optimal: 'Optimal',
};

const GUIDANCE_BADGE: Record<Guidance, string> = {
  'below-optimum': 'badge-warning',
  'above-optimum': 'badge-warning',
  optimal: 'badge-success',
};

const Stat: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-base-content/10 flex flex-col rounded-lg border p-3">
    <span className="text-base-content/60 text-xs">{label}</span>
    <span className="text-base-content text-lg font-bold">{value}</span>
  </div>
);

export const ResultPanel: FC<{
  result: RoundResult;
  round: number;
  onNext: () => void;
}> = ({ result, round, onNext }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex items-center justify-between text-sm">
      <span>
        Round <strong>{round}</strong> / {TOTAL_ROUNDS} result
      </span>
      <span className={`badge ${GUIDANCE_BADGE[result.guidance]}`}>
        {GUIDANCE_LABEL[result.guidance]}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Output Q" value={String(result.q)} />
      <Stat label="Price P" value={formatCurrency(result.price)} />
      <Stat label="Revenue TR" value={formatCurrency(result.tr)} />
      <Stat label="Cost TC" value={formatCurrency(result.tc)} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div
        data-testid="profit-callout"
        className="rounded-box border-base-content/10 border p-3">
        <span className="text-base-content/60 text-xs">Profit</span>
        <div
          className={`text-lg font-bold ${
            result.profit >= 0 ? 'text-success' : 'text-error'
          }`}>
          {formatCurrency(result.profit)}
        </div>
      </div>
      <div
        data-testid="dwl-callout"
        className="rounded-box border-base-content/10 border p-3">
        <span className="text-base-content/60 text-xs">Deadweight Loss</span>
        <div className="text-warning text-lg font-bold">
          {formatCurrency(result.dwl)}
        </div>
      </div>
    </div>
    <p className="text-base-content/60 text-sm">
      {result.guidance === 'below-optimum' &&
        'You are producing too little: raise output toward Q = 40 to earn more.'}
      {result.guidance === 'above-optimum' &&
        'You are producing too much: cut output toward Q = 40 to earn more.'}
      {result.guidance === 'optimal' &&
        'This is the profit-maximizing output — marginal revenue equals marginal cost.'}
    </p>
    <button
      type="button"
      onClick={onNext}
      className="btn btn-primary btn-sm self-end">
      {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const SummaryPanel: FC<{
  bestRound: RoundResult | null;
  totalRounds: number;
  showComparison: boolean;
  onToggle: () => void;
  onReset: () => void;
}> = ({ bestRound, totalRounds, showComparison, onToggle, onReset }) => {
  const matchedOptimum = bestRound !== null && bestRound.q === PROFIT_MAX_Q;
  return (
    <div
      data-testid="summary-panel"
      className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <div className="text-center text-4xl">🏁</div>
      <div className="text-center text-lg font-bold">Final results</div>
      <p className="text-base-content/80 text-center text-sm">
        You played {totalRounds} round{totalRounds === 1 ? '' : 's'}.
      </p>
      <p className="text-center text-sm">
        Best round profit:{' '}
        <strong className="text-primary">
          {bestRound ? formatCurrency(bestRound.profit) : '—'}
        </strong>
        {bestRound && (
          <span className="text-base-content/60">
            {' '}
            at Q = {bestRound.q} (P = {formatCurrency(bestRound.price)})
          </span>
        )}
      </p>
      <p
        className={`text-center text-sm ${
          matchedOptimum ? 'text-success' : 'text-warning'
        }`}>
        {matchedOptimum
          ? 'You matched the profit-maximizing output Q = 40.'
          : 'You did not match the profit-maximizing output Q = 40.'}
      </p>
      <p className="text-base-content/70 text-center text-sm">
        Deadweight loss intuition: cutting output from Q = 80 to Q = 40 and
        raising price from $20 to $60 leaves an $800 triangle of foregone trades
        — the units between Qm and Qc that buyers value above their cost never
        get traded.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          data-testid="comparison-toggle"
          className="btn btn-sm">
          {showComparison ? 'Hide Set P = MC' : 'Set P = MC'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-primary btn-sm">
          Play Again
        </button>
      </div>
    </div>
  );
};

export const ComparisonPanel: FC = () => (
  <div
    data-testid="comparison-panel"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex flex-wrap items-center justify-between gap-1">
      <h3 className="text-primary text-lg font-bold">Set P = MC</h3>
      <span className="text-base-content/60 text-xs">
        Competitive benchmark vs monopoly outcome
      </span>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="border-base-content/10 flex flex-col gap-1 rounded-lg border p-4 text-sm">
        <span className="text-base-content/60 text-xs">
          Competitive (P = MC)
        </span>
        <span>
          Output: <strong>Q = {COMPETITIVE_Q}</strong>
        </span>
        <span>
          Price: <strong>{formatCurrency(COMPETITIVE_PRICE)}</strong>
        </span>
        <span>
          Profit: <strong>{formatCurrency(0)}</strong>
        </span>
        <span>
          Deadweight loss: <strong>{formatCurrency(0)}</strong>
        </span>
      </div>
      <div className="border-base-content/10 flex flex-col gap-1 rounded-lg border p-4 text-sm">
        <span className="text-base-content/60 text-xs">Monopoly (MR = MC)</span>
        <span>
          Output: <strong>Q = {PROFIT_MAX_Q}</strong>
        </span>
        <span>
          Price: <strong>{formatCurrency(PROFIT_MAX_PRICE)}</strong>
        </span>
        <span>
          Profit: <strong>{formatCurrency(PROFIT_MAX)}</strong>
        </span>
        <span>
          Deadweight loss: <strong>{formatCurrency(DWL_MONOPOLY)}</strong>
        </span>
      </div>
    </div>
  </div>
);
