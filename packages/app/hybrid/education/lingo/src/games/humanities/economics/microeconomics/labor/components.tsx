'use client';

import { FC } from 'react';
import { CURVE_SCENARIOS } from './constants';
import type { LaborMetrics } from './types';

export const fmt = (n: number, digits = 1): string =>
  n.toLocaleString('en-US', { maximumFractionDigits: digits });

export const currency = (n: number): string => `$${fmt(n)}`;

export const CurveSlider: FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  testId: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step, testId, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="text-base-content/80 flex items-center justify-between text-sm">
      <span>{label}</span>
      <span data-testid={`${testId}-value`} className="font-semibold">
        {fmt(value)}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid={testId}
      aria-label={label}
      className="range range-sm"
    />
  </div>
);

export const PresetButtons: FC<{ onPick: (id: string) => void }> = ({
  onPick,
}) => (
  <div className="flex flex-wrap gap-2">
    {CURVE_SCENARIOS.map((preset) => (
      <button
        key={preset.id}
        type="button"
        onClick={() => onPick(preset.id)}
        data-testid={`preset-${preset.id}`}
        className="btn btn-outline btn-xs">
        {preset.label}
      </button>
    ))}
  </div>
);

export const Readout: FC<{
  label: string;
  testId: string;
  value: string;
  emphasize?: boolean;
}> = ({ label, testId, value, emphasize }) => (
  <div className="flex items-center justify-between text-sm">
    <span>{label}</span>
    <strong data-testid={testId} className={emphasize ? 'text-primary' : ''}>
      {value}
    </strong>
  </div>
);

export const MetricsCard: FC<{ metrics: LaborMetrics }> = ({ metrics }) => (
  <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
    <Readout
      label="Equilibrium wage w*"
      testId="equilibrium-wage"
      value={`≈ ${currency(metrics.wStar)}`}
      emphasize
    />
    <Readout
      label="Employment"
      testId="employment"
      value={fmt(metrics.employment, 0)}
    />
    <Readout
      label="Unemployment"
      testId="unemployment"
      value={fmt(metrics.unemployment, 0)}
    />
    <Readout
      label="Total surplus"
      testId="surplus"
      value={currency(metrics.surplus)}
    />
    <Readout
      label="Deadweight loss (deficit)"
      testId="deficit"
      value={currency(metrics.deficit)}
    />
  </div>
);

const Bar: FC<{
  label: string;
  value: number;
  max: number;
  color: string;
  testId: string;
}> = ({ label, value, max, color, testId }) => {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="text-base-content/70 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span data-testid={testId} className="font-semibold">
          {fmt(value, 0)}
        </span>
      </div>
      <div className="bg-base-200 h-4 w-full overflow-hidden rounded-full">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export const DemandSupplyChart: FC<{
  metrics: LaborMetrics;
}> = ({ metrics }) => {
  const maxQ = Math.max(metrics.demand, metrics.supply, metrics.qStar, 1);
  const wedge = Math.max(0, metrics.supply - metrics.employment);
  const wedgeWidth = maxQ > 0 ? Math.min(100, (wedge / maxQ) * 100) : 0;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <h2 className="text-base-content/80 text-sm font-semibold">
        Workers at the prevailing wage
      </h2>
      <Bar
        label="📉 Labor demand Ld(w)"
        value={metrics.demand}
        max={maxQ}
        color="bg-primary"
        testId="labor-demand"
      />
      <Bar
        label="📈 Labor supply Ls(w)"
        value={metrics.supply}
        max={maxQ}
        color="bg-secondary"
        testId="labor-supply"
      />
      <div className="flex flex-col gap-1">
        <div className="text-base-content/70 flex items-center justify-between text-xs">
          <span>Unemployment wedge</span>
          <span data-testid="unemployment-wedge" className="font-semibold">
            {fmt(wedge, 0)}
          </span>
        </div>
        <div className="bg-base-200 h-4 w-full overflow-hidden rounded-full">
          <div
            className="bg-error/70 h-full transition-all"
            style={{ width: `${wedgeWidth}%` }}
          />
        </div>
      </div>
      <p className="text-base-content/50 text-[10px]">
        The wedge between supply and demand at the floor wage is the lost jobs —
        workers seeking work that firms will not hire.
      </p>
    </div>
  );
};
