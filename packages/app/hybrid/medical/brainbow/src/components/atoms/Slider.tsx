import type { FC } from 'react';

export interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  value,
  min,
  max,
  step = 1,
  disabled = false,
  ariaLabel,
  onChange,
}) => (
  <input
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    aria-label={ariaLabel}
    className="range range-xs range-primary"
    onChange={(event) => onChange(Number(event.target.value))}
  />
);
