import { FC } from 'react';
import { ASSETS, PRESETS, SLIDER_MAX } from './constants';
import { minVarianceWeights, portfolioSigma } from './game';
import type { AssetId, LiveStats, PortfolioWeights } from './types';

export const pct = (n: number): string => `${(n * 100).toFixed(2)}%`;

export const Readout: FC<{ label: string; value: string; testId?: string }> = ({
  label,
  value,
  testId,
}) => (
  <div
    data-testid={testId}
    className="flex items-center justify-between px-3 py-1.5">
    <span className="text-base-content/60">{label}</span>
    <strong>{value}</strong>
  </div>
);

export const RangeRow: FC<{
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  testId: string;
  onChange: (value: number) => void;
}> = ({ label, min, max, step, value, display, testId, onChange }) => (
  <label className="flex flex-col gap-1 text-xs">
    <span className="text-base-content/70">{label}</span>
    <input
      type="range"
      data-testid={testId}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="range range-sm"
    />
    <span className="text-base-content/60">{display}</span>
  </label>
);

const AssetSliders: FC<{
  weights: PortfolioWeights;
  onWeight: (asset: AssetId, value: number) => void;
}> = ({ weights, onWeight }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {ASSETS.map((asset) => (
      <label key={asset.id} className="flex flex-col gap-1 text-xs">
        <span className="text-base-content/70">
          {asset.name} (μ {pct(asset.mu)}, σ {pct(asset.sigma)})
        </span>
        <input
          type="range"
          data-testid={`weight-${asset.id}`}
          min={0}
          max={SLIDER_MAX}
          value={weights[asset.id]}
          onChange={(e) => onWeight(asset.id, Number(e.target.value))}
          className="range range-primary range-sm"
        />
        <span className="text-base-content/60">
          {weights[asset.id].toFixed(0)}%
        </span>
      </label>
    ))}
  </div>
);

const PresetButtons: FC<{ onPreset: (id: string) => void }> = ({
  onPreset,
}) => (
  <div className="flex flex-wrap gap-2">
    {PRESETS.map((preset) => (
      <button
        key={preset.id}
        type="button"
        data-testid="preset"
        onClick={() => onPreset(preset.id)}
        className="btn btn-sm btn-outline">
        {preset.label}
      </button>
    ))}
  </div>
);

const LabReadouts: FC<{ live: LiveStats; minVarSigma: number }> = ({
  live,
  minVarSigma,
}) => (
  <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
    <Readout label="E[r_p]" value={pct(live.er)} testId="portfolio-return" />
    <Readout label="σ_p" value={pct(live.sigma)} testId="portfolio-risk" />
    <Readout
      label="Diversification benefit"
      value={pct(live.benefit)}
      testId="diversification-benefit"
    />
    <Readout
      label="Min-variance σ_p"
      value={pct(minVarSigma)}
      testId="min-variance"
    />
  </div>
);

export const WeightsLab: FC<{
  weights: PortfolioWeights;
  live: LiveStats;
  onWeight: (asset: AssetId, value: number) => void;
  onPreset: (id: string) => void;
}> = ({ weights, live, onWeight, onPreset }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Drag the sliders to set portfolio weights (0–100 each, normalized to sum
      to 1), or jump to a preset. Watch σ_p fall below the weighted average of
      the parts.
    </p>
    <AssetSliders weights={weights} onWeight={onWeight} />
    <PresetButtons onPreset={onPreset} />
    <LabReadouts
      live={live}
      minVarSigma={portfolioSigma(minVarianceWeights())}
    />
  </div>
);
