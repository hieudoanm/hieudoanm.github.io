import { FC } from 'react';

export const Slider: FC<{
  label: string;
  testid: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}> = ({ label, testid, min, max, step, value, display, onChange }) => (
  <label className="flex flex-1 flex-col gap-1 text-xs">
    <span>
      {label} <strong>{display}</strong>
    </span>
    <input
      data-testid={testid}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-xs"
    />
  </label>
);

const SliderRow: FC<{
  labor: number;
  wage: number;
  fixedCost: number;
  price: number;
  onLabor: (value: number) => void;
  onWage: (value: number) => void;
  onFixedCost: (value: number) => void;
  onPrice: (value: number) => void;
  onReset: () => void;
}> = ({
  labor,
  wage,
  fixedCost,
  price,
  onLabor,
  onWage,
  onFixedCost,
  onPrice,
  onReset,
}) => (
  <div className="flex flex-wrap items-end gap-3">
    <Slider
      label="Labor (L)"
      testid="labor"
      min={0}
      max={20}
      step={1}
      value={labor}
      display={String(labor)}
      onChange={onLabor}
    />
    <Slider
      label="Wage (w)"
      testid="wage"
      min={1}
      max={100}
      step={1}
      value={wage}
      display={`$${wage}`}
      onChange={onWage}
    />
    <Slider
      label="Fixed Cost (FC)"
      testid="fixed-cost"
      min={0}
      max={1000}
      step={10}
      value={fixedCost}
      display={`$${fixedCost}`}
      onChange={onFixedCost}
    />
    <Slider
      label="Price (P)"
      testid="price"
      min={1}
      max={20}
      step={0.5}
      value={price}
      display={`$${price.toFixed(1)}`}
      onChange={onPrice}
    />
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-sm">
      Reset
    </button>
  </div>
);

export const LabControls: FC<{
  labor: number;
  wage: number;
  fixedCost: number;
  price: number;
  onLabor: (value: number) => void;
  onWage: (value: number) => void;
  onFixedCost: (value: number) => void;
  onPrice: (value: number) => void;
  onReset: () => void;
}> = (props) => {
  const {
    labor,
    wage,
    fixedCost,
    price,
    onLabor,
    onWage,
    onFixedCost,
    onPrice,
    onReset,
  } = props;
  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <SliderRow
        labor={labor}
        wage={wage}
        fixedCost={fixedCost}
        price={price}
        onLabor={onLabor}
        onWage={onWage}
        onFixedCost={onFixedCost}
        onPrice={onPrice}
        onReset={onReset}
      />
      <p className="text-base-content/60 text-xs">
        Q = 10·L^0.6 (diminishing returns, rounded). Defaults: w=$10, FC=$100,
        P=$20.
      </p>
    </div>
  );
};

export const ProfitCheck: FC<{
  targetQ: string;
  checkResult: 'idle' | 'correct' | 'wrong';
  onTarget: (value: string) => void;
  onCheck: () => void;
}> = ({ targetQ, checkResult, onTarget, onCheck }) => {
  const message =
    checkResult === 'correct'
      ? 'Correct! That matches P = MC.'
      : checkResult === 'wrong'
        ? 'Not quite. Produce where the last unit has MC below P.'
        : '';
  return (
    <div className="card border-base-content/10 flex flex-wrap items-center gap-3 border p-4">
      <span className="text-sm">
        Guess the profit-maximizing output Q at the current price:
      </span>
      <input
        data-testid="check-input"
        type="number"
        min={0}
        placeholder="Q?"
        value={targetQ}
        onChange={(e) => onTarget(e.target.value)}
        className="input input-sm input-bordered w-24"
      />
      <button
        type="button"
        data-testid="check"
        onClick={onCheck}
        className="btn btn-sm">
        Check
      </button>
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
};
