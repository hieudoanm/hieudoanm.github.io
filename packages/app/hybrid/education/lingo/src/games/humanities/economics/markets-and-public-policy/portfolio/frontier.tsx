import { FC } from 'react';
import { MAX_N } from './constants';
import {
  frontierPoints,
  minVarianceWeights,
  portfolioER,
  portfolioSigma,
  sigmaFree,
  sigmaSystematic,
} from './game';
import { pct, RangeRow, Readout } from './components';
import type { PortfolioWeights } from './types';

interface PlotPoint {
  er: number;
  sigma: number;
}

interface PlotScale {
  x: (sigma: number) => number;
  y: (er: number) => number;
}

const plotPoint = (weights: PortfolioWeights): PlotPoint => ({
  er: portfolioER(weights),
  sigma: portfolioSigma(weights),
});

const builtScale = (points: PlotPoint[]): PlotScale => {
  const sigmas = points.map((p) => p.sigma);
  const ers = points.map((p) => p.er);
  const minSigma = Math.min(...sigmas);
  const spanSigma = Math.max(...sigmas) - minSigma || 1;
  const minEr = Math.min(...ers);
  const spanEr = Math.max(...ers) - minEr || 1;
  const W = 220;
  const H = 150;
  const PAD = 8;
  const x = (sigma: number): number =>
    PAD + ((sigma - minSigma) / spanSigma) * (W - 2 * PAD);
  const y = (er: number): number =>
    H - (PAD + ((er - minEr) / spanEr) * (H - 2 * PAD));
  return { x, y };
};

const FrontierPath: FC<{ points: PlotPoint[]; scale: PlotScale }> = ({
  points,
  scale,
}) => {
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'}${scale.x(p.sigma).toFixed(1)},${scale.y(p.er).toFixed(1)}`
    )
    .join(' ');
  return (
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      data-testid="frontier-curve"
    />
  );
};

const FrontierMarker: FC<{
  cx: number;
  cy: number;
  outline?: boolean;
  testId?: string;
}> = ({ cx, cy, outline, testId }) => (
  <circle
    cx={cx}
    cy={cy}
    r={5}
    fill={outline ? 'none' : 'currentColor'}
    stroke={outline ? 'oklch(var(--p))' : undefined}
    strokeWidth={outline ? 2 : undefined}
    data-testid={testId}
  />
);

const FrontierSvg: FC<{
  points: PlotPoint[];
  minVar: PlotPoint;
  current: PlotPoint;
  scale: PlotScale;
}> = ({ points, minVar, current, scale }) => (
  <svg
    width="220"
    height="150"
    data-testid="frontier-plot"
    viewBox="0 0 220 150"
    className="bg-base-200 rounded-lg">
    <FrontierPath points={points} scale={scale} />
    <FrontierMarker
      cx={scale.x(minVar.sigma)}
      cy={scale.y(minVar.er)}
      outline
      testId="min-variance-marker"
    />
    <FrontierMarker cx={scale.x(current.sigma)} cy={scale.y(current.er)} />
  </svg>
);

export const FrontierPlot: FC<{ weights: PortfolioWeights }> = ({
  weights,
}) => {
  const points = frontierPoints();
  const minVar = plotPoint(minVarianceWeights());
  const current = plotPoint(weights);
  const scale = builtScale([...points, minVar, current]);
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-2 border p-4">
      <p className="text-sm">Efficient frontier — 2-asset Tech/Bonds curve</p>
      <FrontierSvg
        points={points}
        minVar={minVar}
        current={current}
        scale={scale}
      />
      <span className="text-base-content/60 text-xs">
        ◯ min-variance · ● your portfolio
      </span>
    </div>
  );
};

const NAssetControls: FC<{
  n: number;
  rho: number;
  onN: (value: number) => void;
  onRho: (value: number) => void;
}> = ({ n, rho, onN, onRho }) => (
  <div className="grid gap-3 sm:grid-cols-2">
    <RangeRow
      label="Number of assets"
      min={1}
      max={MAX_N}
      step={1}
      value={n}
      display={`N = ${n}`}
      testId="n-assets"
      onChange={onN}
    />
    <RangeRow
      label="Systematic correlation ρ"
      min={0}
      max={100}
      step={1}
      value={Math.round(rho * 100)}
      display={`ρ = ${rho.toFixed(2)}`}
      testId="rho-sys"
      onChange={(v) => onRho(v / 100)}
    />
  </div>
);

const NAssetReadouts: FC<{ n: number; rho: number }> = ({ n, rho }) => (
  <div className="border-base-200 divide-base-200 flex w-full max-w-xs flex-col divide-y rounded-lg border text-xs">
    <Readout label="σ_p = σ/√N" value={pct(sigmaFree(n))} testId="sigma-n" />
    <Readout
      label="σ_p with systematic risk"
      value={pct(sigmaSystematic(n, rho))}
    />
  </div>
);

export const NAssetPanel: FC<{
  n: number;
  rho: number;
  onN: (value: number) => void;
  onRho: (value: number) => void;
}> = ({ n, rho, onN, onRho }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <p className="text-sm">
      Add identical uncorrelated assets (σ = 20%): idiosyncratic risk shrinks
      like σ/√N. With a shared systematic factor, σ_p flattens at a floor.
    </p>
    <NAssetControls n={n} rho={rho} onN={onN} onRho={onRho} />
    <NAssetReadouts n={n} rho={rho} />
  </div>
);
