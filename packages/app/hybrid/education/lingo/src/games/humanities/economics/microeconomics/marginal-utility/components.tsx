import type { FC } from 'react';
import { MAX_INCOME, MAX_PRICE, MIN_INCOME, MIN_PRICE } from './constants';
import type { Good, Mode } from './types';

interface SliderProps {
  testid: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  testid,
  label,
  min,
  max,
  value,
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
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-primary range-sm"
    />
  </label>
);

interface ModePickerProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export const ModePicker: FC<ModePickerProps> = ({ mode, onChange }) => (
  <div className="tabs tabs-boxed self-start">
    <button
      type="button"
      data-testid="mode-lab"
      onClick={() => onChange('lab')}
      className={`tab ${mode === 'lab' ? 'tab-active' : ''}`}>
      Lab
    </button>
    <button
      type="button"
      data-testid="mode-challenge"
      onClick={() => onChange('challenge')}
      className={`tab ${mode === 'challenge' ? 'tab-active' : ''}`}>
      Challenge
    </button>
  </div>
);

interface LabControlsProps {
  pa: number;
  pc: number;
  income: number;
  onPrice: (good: Good, value: number) => void;
  onIncome: (value: number) => void;
}

export const LabControls: FC<LabControlsProps> = ({
  pa,
  pc,
  income,
  onPrice,
  onIncome,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <h2 className="text-primary text-sm font-bold">Prices &amp; income</h2>
    <Slider
      testid="apple-price"
      label="Price of apples (pa)"
      min={MIN_PRICE}
      max={MAX_PRICE}
      value={pa}
      onChange={(value) => onPrice('apple', value)}
    />
    <Slider
      testid="cookie-price"
      label="Price of cookies (pc)"
      min={MIN_PRICE}
      max={MAX_PRICE}
      value={pc}
      onChange={(value) => onPrice('cookie', value)}
    />
    <Slider
      testid="income"
      label="Income (M)"
      min={MIN_INCOME}
      max={MAX_INCOME}
      value={income}
      onChange={onIncome}
    />
  </div>
);

interface UtilityStatsProps {
  totalUtility: number;
  optimalUtility: number;
}

export const UtilityStats: FC<UtilityStatsProps> = ({
  totalUtility,
  optimalUtility,
}) => (
  <div className="stats stats-vertical sm:stats-horizontal">
    <div className="stat">
      <div className="stat-title">Total utility</div>
      <div className="stat-value text-xl" data-testid="total-utility">
        {totalUtility}
      </div>
    </div>
    <div className="stat">
      <div className="stat-title">Optimal utility</div>
      <div className="stat-value text-xl" data-testid="optimal-utility">
        {optimalUtility}
      </div>
    </div>
  </div>
);

interface CheckResetProps {
  onCheck: () => void;
  onReset: () => void;
}

export const CheckReset: FC<CheckResetProps> = ({ onCheck, onReset }) => (
  <div className="flex gap-2">
    <button
      type="button"
      data-testid="check"
      onClick={onCheck}
      className="btn btn-primary btn-sm">
      Check
    </button>
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-outline btn-sm">
      Reset
    </button>
  </div>
);
