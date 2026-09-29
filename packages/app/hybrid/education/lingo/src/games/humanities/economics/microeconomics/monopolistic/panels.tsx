import { FC } from 'react';
import { DemandChart } from './chart';
import { MC } from './constants';
import type { LabDerived } from './types';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const Stat: FC<{
  testid: string;
  label: string;
  value: string;
  tone: 'neutral' | 'success' | 'error';
}> = ({ testid, label, value, tone }) => {
  const color =
    tone === 'success'
      ? 'text-success'
      : tone === 'error'
        ? 'text-error'
        : 'text-base-content';
  return (
    <div
      data-testid={testid}
      className="border-base-content/10 flex flex-col rounded-lg border p-3">
      <span className="text-base-content/60 text-xs">{label}</span>
      <span className={`${color} text-lg font-bold`}>{value}</span>
    </div>
  );
};

export const StatGrid: FC<{ derived: LabDerived }> = ({ derived }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    <Stat
      testid="total-revenue"
      label="Total revenue (TR)"
      value={formatCurrency(derived.totalRevenue)}
      tone="neutral"
    />
    <Stat
      testid="total-cost"
      label="Total cost (TC)"
      value={formatCurrency(derived.totalCost)}
      tone="neutral"
    />
    <Stat
      testid="profit"
      label="Profit"
      value={formatCurrency(derived.profit)}
      tone={derived.profit >= 0 ? 'success' : 'error'}
    />
    <Stat
      testid="marginal-revenue"
      label="Marginal revenue (MR)"
      value={formatCurrency(derived.marginalRevenue)}
      tone="neutral"
    />
    <Stat
      testid="marginal-cost"
      label="Marginal cost (MC)"
      value={formatCurrency(derived.marginalCost)}
      tone="neutral"
    />
    <Stat
      testid="best-q"
      label="Best output (MR = MC)"
      value={`${derived.bestQuantity} units`}
      tone="neutral"
    />
  </div>
);

export const ChartCard: FC<{
  a: number;
  b: number;
  quantity: number;
  bestQuantity: number;
  dwl: number;
}> = ({ a, b, quantity, bestQuantity, dwl }) => (
  <div className="flex flex-col gap-1">
    <DemandChart a={a} b={b} mc={MC} q={quantity} bestQ={bestQuantity} />
    <p className="text-base-content/60 text-xs">
      Shaded triangle: deadweight loss of {formatCurrency(dwl)} — the trades
      lost because output deviates from the efficient P = MC level.
    </p>
  </div>
);
