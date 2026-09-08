import type { FC } from 'react';
import type { SandboxParams, SandboxResult } from '../types';
import { calcSandbox } from '../game';
import { formatCurrency } from './format';

interface SandboxPanelProps {
  sandbox: SandboxParams;
  onUpdate: (params: Partial<SandboxParams>) => void;
  onStart: () => void;
}

export const SandboxPanel: FC<SandboxPanelProps> = ({
  sandbox,
  onUpdate,
  onStart,
}) => {
  const result = calcSandbox(sandbox);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base-content/60 text-sm">
        Explore how opportunity cost works with sliders:
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <WageSliders sandbox={sandbox} onUpdate={onUpdate} />
        <BusinessSliders sandbox={sandbox} onUpdate={onUpdate} />
        <ResultCard result={result} />
      </div>
      <button
        type="button"
        onClick={onStart}
        className="btn btn-primary btn-sm self-start"
        data-testid="start-challenges">
        Start Challenge Rounds
      </button>
    </div>
  );
};
SandboxPanel.displayName = 'SandboxPanel';

interface SliderSubsetProps {
  sandbox: SandboxParams;
  onUpdate: (params: Partial<SandboxParams>) => void;
}

const WageSliders: FC<SliderSubsetProps> = ({ sandbox, onUpdate }) => (
  <>
    <Slider
      label="Hourly wage"
      testid="wages"
      value={sandbox.wages}
      min={5}
      max={50}
      step={1}
      display={formatCurrency(sandbox.wages)}
      onChange={(v) => onUpdate({ wages: v })}
    />
    <Slider
      label="Hours committed"
      testid="hours"
      value={sandbox.hours}
      min={1}
      max={40}
      step={1}
      display={`${sandbox.hours} hrs`}
      onChange={(v) => onUpdate({ hours: v })}
    />
  </>
);

const BusinessSliders: FC<SliderSubsetProps> = ({ sandbox, onUpdate }) => (
  <>
    <Slider
      label="Business gross income"
      testid="business-income"
      value={sandbox.businessIncome}
      min={0}
      max={1000}
      step={10}
      display={formatCurrency(sandbox.businessIncome)}
      onChange={(v) => onUpdate({ businessIncome: v })}
    />
    <Slider
      label="Upfront cost"
      testid="upfront-cost"
      value={sandbox.upfrontCost}
      min={0}
      max={500}
      step={10}
      display={formatCurrency(sandbox.upfrontCost)}
      onChange={(v) => onUpdate({ upfrontCost: v })}
    />
    <Slider
      label="Risk of failure"
      testid="risk"
      value={sandbox.risk}
      min={0}
      max={1}
      step={0.05}
      display={`${Math.round(sandbox.risk * 100)}%`}
      onChange={(v) => onUpdate({ risk: v })}
    />
  </>
);

interface SliderProps {
  label: string;
  testid: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

const Slider: FC<SliderProps> = ({
  label,
  testid,
  value,
  min,
  max,
  step,
  display,
  onChange,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium" data-testid={testid}>
      {label}: <strong>{display}</strong>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-sm"
    />
  </div>
);

const ResultCard: FC<{ result: SandboxResult }> = ({ result }) => (
  <div className="card border-base-content/10 border p-4 sm:col-span-2">
    <div className="flex flex-col gap-1 text-sm">
      <span data-testid="expected-income">
        Expected business income:{' '}
        <strong>{formatCurrency(result.expectedBusinessIncome)}</strong>
      </span>
      <span data-testid="oc-display">
        Opportunity cost (wages foregone):{' '}
        <strong>{formatCurrency(result.opportunityCost)}</strong>
      </span>
      <span data-testid="net-benefit">
        Net benefit of business:{' '}
        <strong
          className={result.netBenefit >= 0 ? 'text-success' : 'text-error'}>
          {formatCurrency(result.netBenefit)}
        </strong>
      </span>
    </div>
  </div>
);
