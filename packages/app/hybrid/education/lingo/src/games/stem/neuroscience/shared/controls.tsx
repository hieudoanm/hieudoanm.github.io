'use client';

import type { FC } from 'react';

/**
 * Numeric controls and readout cards shared by every neuroscience simulator.
 * They carry no domain logic, so they live here rather than in one game's
 * folder — the DDM simulator was their accidental home before.
 */

export const Slider: FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step, format, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <label className="text-base-content/70 text-xs font-medium">
        {label}
      </label>
      <span className="text-primary font-mono text-xs font-bold">
        {format ? format(value) : value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-xs"
    />
    <div className="text-base-content/30 flex justify-between text-xs">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

export const Stat: FC<{
  label: string;
  value: string;
  colorClass?: string;
}> = ({ label, value, colorClass = 'text-primary' }) => (
  <div className="border-base-content/10 bg-base-200/30 flex flex-col items-center gap-1 rounded-lg border px-4 py-3">
    <span className={`font-mono text-xl font-bold ${colorClass}`}>{value}</span>
    <span className="text-base-content/50 text-xs">{label}</span>
  </div>
);
