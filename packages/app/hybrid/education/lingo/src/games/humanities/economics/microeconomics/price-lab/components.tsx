'use client';

import { FC, ReactNode } from 'react';
import { PiArrowDown, PiArrowUp, PiEquals } from 'react-icons/pi';
import type { MarketCondition } from './types';

export const fmt = (n: number, digits = 2): string =>
  n.toLocaleString('en-US', { maximumFractionDigits: digits });

export const currency = (n: number): string => `$${fmt(n)}`;

const CONDITION_META: Record<
  MarketCondition,
  { label: string; badge: string; icon: FC }
> = {
  shortage: { label: 'Shortage', badge: 'badge-warning', icon: PiArrowUp },
  surplus: { label: 'Surplus', badge: 'badge-info', icon: PiArrowDown },
  equilibrium: {
    label: 'Equilibrium',
    badge: 'badge-success',
    icon: PiEquals,
  },
};

export const ConditionBadge: FC<{ condition: MarketCondition }> = ({
  condition,
}) => {
  const meta = CONDITION_META[condition];
  const BadgeIcon = meta.icon;
  return (
    <span data-testid="gap-badge" className={`badge w-fit ${meta.badge}`}>
      <BadgeIcon /> {meta.label}
    </span>
  );
};

export const Slider: FC<{
  label: string;
  value: number;
  valueText: string;
  min: number;
  max: number;
  step: number;
  testId: string;
  toggleTestId?: string;
  enabled?: boolean;
  onChange: (value: number) => void;
  onToggle?: (checked: boolean) => void;
}> = ({
  label,
  value,
  valueText,
  min,
  max,
  step,
  testId,
  toggleTestId,
  enabled,
  onChange,
  onToggle,
}) => (
  <div className="flex flex-col gap-1">
    <div className="text-base-content/80 flex items-center justify-between text-sm">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        {toggleTestId && onToggle && (
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            data-testid={toggleTestId}
            aria-label={`Enable ${label}`}
            className="toggle toggle-sm"
          />
        )}
        <span
          data-testid={`${testId}-value`}
          className="text-base-content font-semibold">
          {valueText}
        </span>
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={enabled === false}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid={testId}
      aria-label={label}
      className="range range-sm"
    />
  </div>
);

const MarketBar: FC<{
  label: string;
  value: number;
  max: number;
  color: string;
}> = ({ label, value, max, color }) => {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-base-content/70 font-medium">{label}</span>
        <span className="font-semibold">{fmt(value, 0)}</span>
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

export const MarketChart: FC<{ qd: number; qs: number; qStar: number }> = ({
  qd,
  qs,
  qStar,
}) => {
  const maxQ = Math.max(qd, qs, qStar, 1);
  const eqPct = Math.min(100, (qStar / maxQ) * 100);
  return (
    <div className="relative flex flex-col gap-3">
      <MarketBar
        label="📉 Quantity demanded (Qd)"
        value={qd}
        max={maxQ}
        color="bg-primary"
      />
      <MarketBar
        label="📈 Quantity supplied (Qs)"
        value={qs}
        max={maxQ}
        color="bg-secondary"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full">
        <div
          className="border-base-content/60 absolute inset-y-0 border-l-2 border-dashed"
          style={{ left: `${eqPct}%` }}>
          <span className="absolute top-1/2 left-1.5 -translate-y-1/2 text-xs font-semibold">
            Q*
          </span>
        </div>
      </div>
    </div>
  );
};

export const Readout: FC<{
  label: string;
  testId?: string;
  children: ReactNode;
}> = ({ label, testId, children }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <strong data-testid={testId}>{children}</strong>
  </div>
);
