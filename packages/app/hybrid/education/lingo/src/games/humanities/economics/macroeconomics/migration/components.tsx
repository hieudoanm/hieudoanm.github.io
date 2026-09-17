import type { FC } from 'react';

export const formatCurrency = (n: number): string =>
  `$${Math.round(n).toLocaleString('en-US')}`;

export const formatPercent = (n: number): string => `${Math.round(n * 100)}%`;

interface SliderProps {
  testid: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  testid,
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <span className="text-base-content/70">{label}</span>
      <strong className="text-primary">{display}</strong>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid={testid}
      className="range range-primary range-sm"
    />
  </div>
);

interface ButtonProps {
  testid: string;
  children: string;
  onClick: () => void;
  className?: string;
}

export const ActionButton: FC<ButtonProps> = ({
  testid,
  children,
  onClick,
  className = 'btn btn-primary btn-sm',
}) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    className={className}>
    {children}
  </button>
);

export const StatRow: FC<{
  label: string;
  value: string;
  valueClass?: string;
}> = ({ label, value, valueClass }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-base-content/70">{label}</span>
    <strong className={valueClass}>{value}</strong>
  </div>
);
