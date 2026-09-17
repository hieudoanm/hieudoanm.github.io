import { FC } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { privateOptimalQ, socialOptimalQ } from './game';
import type { RoundResult } from './types';

const money = (n: number): string => `$${n.toFixed(2)}`;

const ROWS: Array<{
  key: string;
  label: string;
  value: (r: RoundResult) => number;
}> = [
  { key: 'price', label: 'Price', value: (r) => r.price },
  { key: 'revenue', label: 'Revenue', value: (r) => r.revenue },
  { key: 'cost', label: 'Production cost', value: (r) => r.prodCost },
  { key: 'damage', label: 'External damage', value: (r) => r.damage },
  { key: 'tax', label: 'Tax paid', value: (r) => r.taxPaid },
  { key: 'profit', label: 'Profit', value: (r) => r.profit },
  { key: 'welfare', label: 'Social welfare', value: (r) => r.socialWelfare },
];

export const ResultPanel: FC<{
  result: RoundResult;
  round: number;
  onNext: () => void;
}> = ({ result, round, onNext }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-lg">
      Round {round} — Phase {result.phase}
    </div>
    <div>
      You produced <strong>Q = {result.q}</strong>
    </div>
    <ul className="flex w-full max-w-sm flex-col gap-1 text-sm">
      {ROWS.map((row) => (
        <li
          key={row.key}
          className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
          <span>{row.label}</span>
          <strong data-testid={`result-${row.key}`}>
            {money(row.value(result))}
          </strong>
        </li>
      ))}
    </ul>
    <div className="alert alert-info max-w-sm text-sm">
      <span data-testid="callout">{result.callout}</span>
    </div>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {round >= TOTAL_ROUNDS ? 'See Summary' : 'Next Round'}
    </button>
  </div>
);

const bestOf = (
  results: RoundResult[],
  phase: number
): RoundResult | undefined => {
  const inPhase = results.filter((r) => r.phase === phase);
  if (inPhase.length === 0) return undefined;
  return inPhase.reduce((best, r) => (r.profit > best.profit ? r : best));
};

export const SummaryPanel: FC<{
  results: RoundResult[];
  onReset: () => void;
}> = ({ results, onReset }) => {
  const noTax = bestOf(results, 1);
  const withTax = bestOf(results, 2);
  const privateQ = privateOptimalQ(0);
  const socialQ = socialOptimalQ();
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-lg" data-testid="summary-title">
        Pigou&rsquo;s Factory — Summary
      </div>
      {noTax && (
        <div className="text-sm" data-testid="summary-phase1">
          No tax — best round {noTax.round}: Q = {noTax.q}, profit{' '}
          {money(noTax.profit)}, social welfare {money(noTax.socialWelfare)}.
        </div>
      )}
      {withTax && (
        <div className="text-sm" data-testid="summary-phase2">
          With tax — best round {withTax.round}: Q = {withTax.q}, profit{' '}
          {money(withTax.profit)}, social welfare {money(withTax.socialWelfare)}
          .
        </div>
      )}
      <p className="max-w-md text-center text-sm">
        Without a tax your profit-maximizing output (Q = {privateQ}) overshoots
        the social optimum (Q = {socialQ}), so surplus is destroyed — that gap
        is deadweight loss. A Pigouvian tax of $4 per ton charges the external
        damage back to you, making your private cost equal the social cost: the
        externality is internalized and your optimum lands exactly on Q ={' '}
        {socialQ}.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
