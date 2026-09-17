import { FC } from 'react';
import { PRESETS } from './constants';
import type { CountryPreset, Institutions, SimulationResult } from './types';

export const SliderControl: FC<{
  testid: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}> = ({ testid, label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm">
      {label}: <strong>{value}</strong>
    </label>
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid={testid}
      className="range range-primary range-xs"
    />
  </div>
);

export const PresetPicker: FC<{
  onPick: (preset: CountryPreset) => void;
}> = ({ onPick }) => (
  <div>
    <p className="text-base-content/60 mb-2 text-sm">
      Choose a starting country profile:
    </p>
    <div className="grid gap-2 sm:grid-cols-3">
      {(Object.keys(PRESETS) as CountryPreset[]).map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onPick(preset)}
          data-testid={`preset-${preset}`}
          className="card border-base-content/10 border p-3 text-left transition-colors">
          <span className="text-lg">
            {PRESETS[preset].emoji} {PRESETS[preset].label}
          </span>
          <span className="text-base-content/60 block text-xs">
            P:{PRESETS[preset].institutions.propertyRights} C:
            {PRESETS[preset].institutions.contracts} S:
            {PRESETS[preset].institutions.stability}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export const SliderPanel: FC<{
  institutions: Institutions;
  onChange: (which: keyof Institutions, value: number) => void;
}> = ({ institutions, onChange }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <SliderControl
      testid="property-rights"
      label="Property Rights (P)"
      value={institutions.propertyRights}
      onChange={(v) => onChange('propertyRights', v)}
    />
    <SliderControl
      testid="contracts"
      label="Contract Enforcement (C)"
      value={institutions.contracts}
      onChange={(v) => onChange('contracts', v)}
    />
    <SliderControl
      testid="stability"
      label="Political Stability (S)"
      value={institutions.stability}
      onChange={(v) => onChange('stability', v)}
    />
  </div>
);

export const SimulateButtons: FC<{
  onSimulate: () => void;
  onReset: () => void;
}> = ({ onSimulate, onReset }) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={onSimulate}
      data-testid="simulate"
      className="btn btn-primary btn-sm">
      Simulate 10 Years
    </button>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-ghost btn-sm">
      Reset
    </button>
  </div>
);

export const ResultStats: FC<{ result: SimulationResult }> = ({ result }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
    <StatCard
      testid="gdp-growth"
      label="GDP growth"
      value={`${result.growthPct}%`}
    />
    <StatCard
      testid="investment-rate"
      label="Investment rate"
      value={`${result.investmentRate}%`}
    />
    <StatCard
      testid="capital"
      label="Capital"
      value={String(result.years[result.years.length - 1].capital)}
    />
    <StatCard
      testid="gdp-capita"
      label="GDP per capita"
      value={String(result.gdpPerCapita)}
    />
  </div>
);

const StatCard: FC<{ testid: string; label: string; value: string }> = ({
  testid,
  label,
  value,
}) => (
  <div className="card border-base-content/10 border p-3 text-center">
    <div className="text-base-content/60 text-xs">{label}</div>
    <div className="text-lg" data-testid={testid}>
      {value}
    </div>
  </div>
);

export const ResultPanel: FC<{
  result: SimulationResult;
  target: number;
  success: boolean;
  onNext: () => void;
}> = ({ result, target, success, onNext }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className={success ? 'text-success' : 'text-error'}>
      {success
        ? 'Target hit — inclusive reforms paid off!'
        : `Missed target of ${target}% growth.`}
    </div>
    <ResultStats result={result} />
    <button
      type="button"
      onClick={onNext}
      data-testid="check"
      className="btn btn-primary btn-sm">
      Next Round
    </button>
  </div>
);
