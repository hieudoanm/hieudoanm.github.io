'use client';

import { FC, ReactNode } from 'react';
import { analyze } from './game';
import type { Market, RoundKind, RoundSpec } from './types';

export const fmt = (n: number, digits = 0): string =>
  n.toLocaleString('en-US', { maximumFractionDigits: digits });

export const currency = (n: number): string => `$${fmt(Math.round(n))}`;

export const pct = (fraction: number): string =>
  `${Math.round(fraction * 100)}%`;

export const Readout: FC<{
  label: string;
  testId?: string;
  children: ReactNode;
}> = ({ label, testId, children }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-base-content/70">{label}</span>
    <strong className="text-base-content" data-testid={testId}>
      {children}
    </strong>
  </div>
);

export const Slider: FC<{
  label: string;
  value: number;
  valueText: string;
  min: number;
  max: number;
  step: number;
  testId: string;
  onChange: (value: number) => void;
}> = ({ label, value, valueText, min, max, step, testId, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span className="font-semibold" data-testid={`${testId}-value`}>
        {valueText}
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

export const kindLabel = (kind: RoundKind): string => {
  switch (kind) {
    case 'revenue':
      return 'Revenue-maxing tariff';
    case 'protection':
      return 'Protection target';
    case 'import-target':
      return 'Import target';
    case 'retaliation':
      return 'Retaliation';
  }
};

export const objective = (spec: RoundSpec): string => {
  switch (spec.kind) {
    case 'revenue':
      return 'Pick the tariff that maximizes tariff revenue — Revenue(t) = Pw·t·imports(t).';
    case 'protection':
      return `Cut imports by at least ${spec.target} units with the least deadweight loss (DWL grows with t²).`;
    case 'import-target':
      return `Set the tariff so imports land as close to ${spec.target} units as possible (imports = Qd(Pt) − Qs(Pt)).`;
    case 'retaliation':
      return 'Find the Nash tariff — each country\u2019s best response to the other.';
  }
};

export const TariffOptions: FC<{
  options: number[];
  selected: number | null;
  onSelect: (t: number) => void;
}> = ({ options, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((t) => (
      <button
        key={t}
        type="button"
        onClick={() => onSelect(t)}
        data-testid={`tariff-option-${t}`}
        className={`btn btn-sm ${selected === t ? 'btn-primary' : 'btn-outline'}`}>
        {pct(t)}
      </button>
    ))}
  </div>
);

export const MarketContext: FC<{ market: Market }> = ({ market }) => {
  const free = analyze(market, 0);
  return (
    <p className="bg-base-200 rounded-lg p-3 text-xs">
      Demand P = {market.ad} − {market.bd}·Q · Supply P = {market.as} +{' '}
      {market.bs}·Q · World price {currency(market.worldP)} · Autarky{' '}
      {currency(free.autarkyPrice)} · Free-trade imports {fmt(free.imports)}
    </p>
  );
};
