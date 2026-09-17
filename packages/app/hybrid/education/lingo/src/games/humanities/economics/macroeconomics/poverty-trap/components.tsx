import { FC } from 'react';
import {
  MAX_INITIAL_CAPITAL,
  MAX_SAVINGS_RATE,
  MIN_INITIAL_CAPITAL,
  MIN_SAVINGS_RATE,
  YEARS,
} from './constants';
import type { Scenario, Simulation, TrapPhase } from './types';

export const PhaseBadge: FC<{ phase: TrapPhase }> = ({ phase }) => {
  const meta: Record<TrapPhase, { label: string; cls: string; emoji: string }> =
    {
      trapped: { label: 'Trapped', cls: 'badge-error', emoji: '🔻' },
      escaping: { label: 'Escaping', cls: 'badge-success', emoji: '📈' },
      'at-threshold': {
        label: 'At threshold',
        cls: 'badge-warning',
        emoji: '⚖️',
      },
    };
  const m = meta[phase];
  return (
    <span className={`badge ${m.cls} gap-1`} data-testid="phase">
      {m.emoji} {m.label}
    </span>
  );
};

export const SimControls: FC<{
  initialCapital: number;
  savingsRate: number;
  subsistence: number;
  threshold: number;
  onCapital: (v: number) => void;
  onRate: (v: number) => void;
  onSubsistence: (v: number) => void;
}> = ({
  initialCapital,
  savingsRate,
  subsistence,
  threshold,
  onCapital,
  onRate,
  onSubsistence,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>Initial capital (K₀)</span>
        <strong data-testid="initial-capital-value">{initialCapital}</strong>
      </div>
      <input
        type="range"
        min={MIN_INITIAL_CAPITAL}
        max={MAX_INITIAL_CAPITAL}
        step={1}
        value={initialCapital}
        onChange={(e) => onCapital(Number(e.target.value))}
        data-testid="initial-capital"
        className="range range-primary range-xs"
      />
    </div>
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>Savings rate (s)</span>
        <strong data-testid="savings-rate-value">
          {savingsRate.toFixed(2)}
        </strong>
      </div>
      <input
        type="range"
        min={MIN_SAVINGS_RATE}
        max={MAX_SAVINGS_RATE}
        step={0.01}
        value={savingsRate}
        onChange={(e) => onRate(Number(e.target.value))}
        data-testid="savings-rate"
        className="range range-primary range-xs"
      />
    </div>
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>Subsistence consumption (c)</span>
        <strong data-testid="subsistence-value">{subsistence}</strong>
      </div>
      <input
        type="range"
        min={10}
        max={48}
        step={1}
        value={subsistence}
        onChange={(e) => onSubsistence(Number(e.target.value))}
        data-testid="subsistence"
        className="range range-primary range-xs"
      />
    </div>
    <p className="text-base-content/60 text-xs">
      Escape threshold K*:{' '}
      <strong data-testid="threshold">{threshold.toFixed(1)}</strong>
    </p>
  </div>
);

export const SimTable: FC<{
  rows: Simulation[];
  threshold: number;
  scenario: Scenario;
}> = ({ rows, threshold, scenario }) => {
  const reached = rows.some((r) => r.capital >= threshold);
  return (
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
      <div className="flex items-center justify-between text-sm">
        <span>{scenario.label}</span>
        <span className="badge gap-1" data-testid="reached-threshold">
          {reached ? '✅ Reached threshold' : '⬜ Below threshold'}
        </span>
      </div>
      <div className="max-h-72 overflow-auto">
        <table className="table-xs table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Income Y</th>
              <th>Net savings</th>
              <th>Capital K</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.year}
                className={r.capital >= threshold ? 'bg-success/10' : ''}>
                <td data-testid="year">{r.year}</td>
                <td data-testid="income">{r.income.toFixed(1)}</td>
                <td data-testid="net-savings">{r.netSavings.toFixed(1)}</td>
                <td data-testid="capital">{r.capital.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base-content/60 text-xs">
        Final capital: {rows[rows.length - 1].capital.toFixed(1)} over {YEARS}{' '}
        years.
      </p>
    </div>
  );
};
