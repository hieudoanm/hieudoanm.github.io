import { FC, useMemo } from 'react';
import { FREQUENCIES } from './constants';
import { computeCalculatorResult, formatCurrency } from './game';
import { GrowthCurve, ResultsPanel, DoublingTimeline } from './components';
import type { CompoundingFrequency } from './types';

export const CalculatorPhase: FC<{
  principal: number;
  rate: number;
  years: number;
  compounding: CompoundingFrequency;
  onPrincipal: (v: number) => void;
  onRate: (v: number) => void;
  onYears: (v: number) => void;
  onCompounding: (v: CompoundingFrequency) => void;
  onCheck: () => void;
}> = ({
  principal,
  rate,
  years,
  compounding,
  onPrincipal,
  onRate,
  onYears,
  onCompounding,
  onCheck,
}) => {
  const result = useMemo(
    () => computeCalculatorResult(principal, rate, years, compounding),
    [principal, rate, years, compounding]
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Principal (P)</span>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={principal}
            onChange={(e) => onPrincipal(Number(e.target.value))}
            data-testid="principal"
            className="range range-primary range-sm"
          />
          <span className="text-sm font-medium">
            {formatCurrency(principal)}
          </span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Annual Rate (r)</span>
          <input
            type="range"
            min={0}
            max={12}
            step={0.25}
            value={rate}
            onChange={(e) => onRate(Number(e.target.value))}
            data-testid="rate"
            className="range range-primary range-sm"
          />
          <span className="text-sm font-medium">{rate.toFixed(2)}%</span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Years (t)</span>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={(e) => onYears(Number(e.target.value))}
            data-testid="years"
            className="range range-primary range-sm"
          />
          <span className="text-sm font-medium">{years} years</span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-base-content/60 text-xs">Compounding</span>
          <select
            value={String(compounding)}
            onChange={(e) =>
              onCompounding(
                e.target.value === 'continuous'
                  ? 'continuous'
                  : (Number(e.target.value) as CompoundingFrequency)
              )
            }
            data-testid="compounding"
            className="select select-bordered select-sm">
            {FREQUENCIES.map((f) => (
              <option key={String(f.value)} value={String(f.value)}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ResultsPanel result={result} />
      <GrowthCurve points={result.curvePoints} principal={principal} />
      <DoublingTimeline doublingTime={result.doublingTime} years={years} />
      <button
        type="button"
        onClick={onCheck}
        data-testid="check"
        className="btn btn-primary btn-sm self-start">
        Start Investment Rounds
      </button>
    </div>
  );
};
CalculatorPhase.displayName = 'CalculatorPhase';
