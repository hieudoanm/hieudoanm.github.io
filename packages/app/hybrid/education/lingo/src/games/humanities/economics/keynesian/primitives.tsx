import type { FC } from 'react';

export const formatNum = (n: number): string => {
  if (Math.abs(n - Math.round(n)) < 0.05) return String(Math.round(n));
  return n.toFixed(1);
};

export const formatMpc = (n: number): string =>
  String(Math.round(n * 100) / 100);

export const SliderField: FC<{
  label: string;
  testId: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display?: string;
}> = ({ label, testId, value, min, max, step, onChange, display }) => (
  <label className="form-control w-full">
    <div className="text-base-content/80 flex items-center justify-between gap-2 text-sm">
      <span>{label}</span>
      <span data-testid={`${testId}-value`} className="font-semibold">
        {display ?? value}
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
  </label>
);

export const StatBox: FC<{
  label: string;
  value: string;
  testId: string;
  tone?: string;
}> = ({ label, value, testId, tone }) => (
  <div className="border-base-200 flex flex-col gap-1 rounded-lg border p-3">
    <span className="text-base-content/60 text-xs">{label}</span>
    <span data-testid={testId} className={`text-lg font-bold ${tone ?? ''}`}>
      {value}
    </span>
  </div>
);
