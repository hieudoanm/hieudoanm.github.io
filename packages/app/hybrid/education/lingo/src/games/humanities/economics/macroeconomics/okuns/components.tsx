import type { FC } from 'react';
import type { ModelParams } from './types';

export const formatSigned = (value: number): string =>
  `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

export const Stat: FC<{
  label: string;
  value: string;
  testid?: string;
}> = ({ label, value, testid }) => (
  <div className="border-base-content/10 rounded-lg border px-3 py-2 text-center">
    <span className="text-base-content/60 block text-xs">{label}</span>
    <span className="text-lg font-bold" data-testid={testid ?? undefined}>
      {value}
    </span>
  </div>
);

export const SliderField: FC<{
  label: string;
  testid: string;
  min: number;
  max: number;
  step: number;
  value: number;
  suffix?: string;
  decimals?: number;
  onChange: (value: number) => void;
}> = ({
  label,
  testid,
  min,
  max,
  step,
  value,
  suffix = '%',
  decimals = 1,
  onChange,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span className="font-bold">
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      data-testid={testid}
      className="range range-primary range-sm"
    />
  </div>
);

export const OkunEquation: FC<{ model: ModelParams }> = ({ model }) => (
  <div className="bg-base-200 flex flex-col gap-1 rounded-lg p-4 text-center">
    <span className="font-mono text-lg">Δu = −c·(g − g*)</span>
    <span className="text-base-content/60 text-xs">
      With c = {model.c.toFixed(2)} and g* = {model.gStar.toFixed(1)}%: growth a
      point above potential cuts unemployment {model.c.toFixed(2)} points a
      year.
    </span>
  </div>
);
