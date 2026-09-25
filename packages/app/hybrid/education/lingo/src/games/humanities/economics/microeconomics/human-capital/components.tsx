import type { FC } from 'react';
import { YEARS_MAX } from './constants';
import { annualWage } from './game';

export const money = (n: number): string =>
  `$${Math.round(n).toLocaleString('en-US')}`;

interface SliderProps {
  testid: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  testid,
  label,
  min,
  max,
  step,
  value,
  disabled,
  onChange,
}) => (
  <label className="form-control">
    <div className="label">
      <span className="label-text">{label}</span>
      <span className="label-text" data-testid={`${testid}-value`}>
        {value}
      </span>
    </div>
    <input
      type="range"
      data-testid={testid}
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-sm"
    />
  </label>
);

interface ReadoutProps {
  annualWage: number;
  pvEarnings: number;
  pvCost: number;
  npv: number;
  optimalYears: number;
}

const Stat: FC<{
  label: string;
  testid: string;
  children: string | number;
}> = ({ label, testid, children }) => (
  <div className="stat">
    <div className="stat-title">{label}</div>
    <div className="stat-value text-lg" data-testid={testid}>
      {children}
    </div>
  </div>
);

export const ReadoutPanel: FC<ReadoutProps> = (props) => (
  <div className="stats stats-vertical w-full">
    <Stat label="Annual wage" testid="annual-wage">
      {money(props.annualWage)}
    </Stat>
    <Stat label="PV earnings" testid="pv-earnings">
      {money(props.pvEarnings)}
    </Stat>
    <Stat label="PV cost" testid="pv-cost">
      {money(props.pvCost)}
    </Stat>
    <Stat label="Net present value" testid="npv">
      {money(props.npv)}
    </Stat>
    <Stat label="Optimal years" testid="optimal-years">
      {props.optimalYears}
    </Stat>
  </div>
);

export const WageCurve: FC<{ w0: number; years: number }> = ({ w0, years }) => {
  const W = 560;
  const H = 140;
  const pad = 10;
  const maxWage = annualWage(YEARS_MAX, w0);
  const x = (s: number): number => pad + (s / YEARS_MAX) * (W - pad * 2);
  const y = (w: number): number => H - pad - (w / maxWage) * (H - pad * 2);
  const points = Array.from({ length: YEARS_MAX + 1 }, (_, s) => {
    const wage = annualWage(s, w0);
    return `${x(s)},${y(wage).toFixed(1)}`;
  }).join(' ');
  const chosenY = y(annualWage(years, w0));
  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        data-testid="wage-curve"
        className="text-primary w-full">
        <path
          d={`M ${points}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1={x(years)}
          y1={chosenY}
          x2={x(years)}
          y2={H - pad}
          stroke="currentColor"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        <circle cx={x(years)} cy={chosenY} r="4" fill="currentColor" />
        <text x={x(0)} y={H} fontSize="9">
          0
        </text>
        <text x={x(YEARS_MAX) - 16} y={H} fontSize="9">
          {YEARS_MAX} yrs
        </text>
      </svg>
      <p className="text-base-content/60 mt-1 text-xs">
        Annual wage vs. years of schooling, W0 × (1.08)^S
      </p>
    </div>
  );
};
