import { FC } from 'react';
import { MAX_QUANTITY, MC } from './constants';
import { effectiveIntercept, slopeAt } from './game';
import { ChartCard, StatGrid } from './panels';
import type { LabDerived, Mode } from './types';

const SliderRow: FC<{
  testid: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}> = ({
  testid,
  label,
  value,
  min,
  max,
  suffix = '',
  disabled = false,
  onChange,
}) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="text-base-content/60 text-xs">{label}</span>
    <span className="flex items-center gap-2">
      <input
        type="range"
        data-testid={testid}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range range-primary range-xs flex-1"
      />
      <span className="text-base-content w-14 text-right font-bold">
        {value}
        {suffix}
      </span>
    </span>
  </label>
);

const SlidersCard: FC<{
  differentiation: number;
  price: number;
  quantity: number;
  maxPrice: number;
  priceTaker: boolean;
  onDifferentiation: (value: number) => void;
  onPrice: (value: number) => void;
  onQuantity: (value: number) => void;
}> = ({
  differentiation,
  price,
  quantity,
  maxPrice,
  priceTaker,
  onDifferentiation,
  onPrice,
  onQuantity,
}) => (
  <div className="flex flex-col gap-3">
    <SliderRow
      testid="differentiation"
      label="Product differentiation (D) — more D, steeper and more inelastic demand"
      value={differentiation}
      min={0}
      max={100}
      suffix="%"
      onChange={onDifferentiation}
    />
    <SliderRow
      testid="price"
      label={priceTaker ? 'Price (P) — set by the market at MC' : 'Price (P)'}
      value={price}
      min={MC}
      max={Math.max(MC, maxPrice)}
      suffix="$"
      disabled={priceTaker}
      onChange={onPrice}
    />
    <SliderRow
      testid="quantity"
      label="Output (Q)"
      value={quantity}
      min={0}
      max={MAX_QUANTITY}
      onChange={onQuantity}
    />
  </div>
);

const EntryCard: FC<{
  mode: Mode;
  entryProgress: number;
  onEntry: () => void;
}> = ({ mode, entryProgress, onEntry }) => {
  if (mode !== 'monopolistic') return null;
  const done = entryProgress >= 1;
  return (
    <div
      data-testid="entry"
      className="border-base-content/10 flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between text-sm">
        <span>Short run → long run (entry erodes demand)</span>
        <span className="font-bold">{Math.round(entryProgress * 100)}%</span>
      </div>
      <progress
        className="progress progress-primary"
        value={entryProgress}
        max={1}
      />
      <button
        type="button"
        onClick={onEntry}
        disabled={done}
        className="btn btn-sm self-end">
        {done ? 'Long-run equilibrium' : 'Simulate Entry'}
      </button>
    </div>
  );
};

export interface LabPanelProps {
  mode: Mode;
  differentiation: number;
  quantity: number;
  entryProgress: number;
  derived: LabDerived;
  onDifferentiation: (value: number) => void;
  onPrice: (value: number) => void;
  onQuantity: (value: number) => void;
  onEntry: () => void;
  onStartQuiz: () => void;
}

export const LabPanel: FC<LabPanelProps> = ({
  mode,
  differentiation,
  quantity,
  entryProgress,
  derived,
  onDifferentiation,
  onPrice,
  onQuantity,
  onEntry,
  onStartQuiz,
}) => {
  const a = effectiveIntercept(differentiation, entryProgress, mode);
  const priceTaker = mode === 'perfect';
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <SlidersCard
        differentiation={differentiation}
        price={derived.price}
        quantity={quantity}
        maxPrice={Math.round(a)}
        priceTaker={priceTaker}
        onDifferentiation={onDifferentiation}
        onPrice={onPrice}
        onQuantity={onQuantity}
      />
      {priceTaker && (
        <p className="text-success text-xs">
          Price is taken: P = MC = $8, so economic profit is zero at every
          output.
        </p>
      )}
      <StatGrid derived={derived} />
      <EntryCard mode={mode} entryProgress={entryProgress} onEntry={onEntry} />
      <ChartCard
        a={a}
        b={slopeAt(differentiation)}
        quantity={quantity}
        bestQuantity={derived.bestQuantity}
        dwl={derived.dwl}
      />
      <button
        type="button"
        onClick={onStartQuiz}
        data-testid="start-quiz"
        className="btn btn-primary btn-sm self-end">
        Take the Quiz
      </button>
    </div>
  );
};
