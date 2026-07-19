import { FC } from 'react';
import type { LorenzPoint, RoundOutcome } from './types';

const fmt = (n: number, digits = 3): string => n.toFixed(digits);

export const LorenzChart: FC<{ points: LorenzPoint[] }> = ({ points }) => {
  const width = 280;
  const height = 280;
  const pad = 30;
  const scale = (p: LorenzPoint): [number, number] => [
    pad + p.x * (width - 2 * pad),
    height - pad - p.y * (height - 2 * pad),
  ];
  const line = points.map(scale);
  const poly = [
    `${pad},${height - pad}`,
    ...line.map(([x, y]) => `${x},${y}`),
  ].join(' ');
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto h-64 w-64 sm:h-72 sm:w-72"
      data-testid="lorenz-chart">
      <line
        x1={pad}
        y1={height - pad}
        x2={width - pad}
        y2={pad}
        stroke="#9ca3af"
        strokeDasharray="4 4"
      />
      <polyline
        points={poly}
        fill="none"
        stroke="#22c55e"
        strokeWidth={2}
        data-testid="lorenz-polyline"
      />
      {line.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={3} fill="#22c55e" />
      ))}
    </svg>
  );
};

export const OutcomePanel: FC<{
  outcome: RoundOutcome;
  onNext: () => void;
  last: boolean;
}> = ({ outcome, onNext, last }) => {
  const delta = outcome.afterGini - outcome.baseGini;
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">
        {outcome.winning ? '🎯' : outcome.score > 0 ? '👏' : '📉'}
      </div>
      <div className="text-lg">Round {outcome.round} outcome</div>
      <div className="flex flex-col gap-1 text-center text-sm">
        <span>
          Base Gini: <strong>{fmt(outcome.baseGini)}</strong> → After policy:{' '}
          <strong className="text-primary">{fmt(outcome.afterGini)}</strong>
        </span>
        <span className={delta <= 0 ? 'text-success' : 'text-error'}>
          Change: {delta <= 0 ? '▼' : '▲'} {fmt(delta)}
        </span>
        <span>
          Rebate per person: <strong>${outcome.rebate.toFixed(2)}k</strong>
        </span>
        <span>
          Poverty at ${30}k: {fmt(outcome.povertyBefore * 100, 0)}% →{' '}
          <strong>{fmt(outcome.povertyAfter * 100, 0)}%</strong>
        </span>
        <span>
          Your tax rate was {fmt(outcome.chosenTax * 100, 0)}% — this round
          scores <strong>{outcome.score}</strong> point
          {outcome.score === 1 ? '' : 's'}.
        </span>
      </div>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {last ? 'See Final Score' : 'Next Round'}
      </button>
    </div>
  );
};

export const FinalPanel: FC<{
  outcomes: RoundOutcome[];
  totalScore: number;
  onReset: () => void;
}> = ({ outcomes, totalScore, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">🏁</div>
    <div className="text-lg">
      Final score: {totalScore} / {outcomes.length * 3}
    </div>
    <div className="border-base-300 w-full max-w-md rounded-lg border p-3 text-sm">
      {outcomes.map((o) => (
        <div
          key={o.round}
          className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
          <span>Round {o.round}</span>
          <span>
            {fmt(o.chosenTax * 100, 0)}% → Gini {fmt(o.afterGini)}
          </span>
          <span>{o.score} pts</span>
        </div>
      ))}
    </div>
    <p className="text-base-content/60 max-w-md text-center text-xs">
      A proportional tax with a uniform per-capita rebate is progressive: it
      preserves the income ordering but bends the Lorenz curve inward, lowering
      the Gini. Mean income stays the same — it is revenue-neutral by
      construction, yet the headcount of poverty can still fall.
    </p>
    <button type="button" onClick={onReset} className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
