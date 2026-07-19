import type { FC } from 'react';
import { formatSigned, Stat } from '../components';
import {
  GROWTH_MAX,
  GROWTH_MIN,
  GROWTH_STEP,
  QUARTERS,
  STEER_ROUNDS,
} from '../constants';
import { outputGap, projectUnemployment } from '../game';

export const UnemploymentPath: FC<{
  uStart: number;
  c: number;
  gStar: number;
  g: number;
  uStar: number;
}> = ({ uStart, c, gStar, g, uStar }) => {
  const path = projectUnemployment(uStart, c, gStar, g, QUARTERS);
  const all = [...path, uStar];
  const height = 80;
  const width = 260;
  const step = width / QUARTERS;
  const yMin = Math.min(...all) - 0.5;
  const yMax = Math.max(...all) + 0.5;
  const x = (index: number): number => index * step;
  const y = (value: number): number =>
    height - ((value - yMin) * height) / (yMax - yMin);
  const points = path
    .map((value, index) => `${x(index)},${y(value)}`)
    .join(' ');
  const targetY = y(uStar);
  return (
    <div
      data-testid="quarter"
      className="border-base-content/10 rounded-lg border p-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-xs">
        <line
          x1={0}
          y1={targetY}
          x2={width}
          y2={targetY}
          strokeDasharray="4 3"
          className="text-warning"
          stroke="currentColor"
        />
        <polyline
          points={points}
          fill="none"
          strokeWidth={2}
          className="text-primary"
          stroke="currentColor"
        />
        {path.map((value, index) => (
          <circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={2.5}
            className="fill-primary"
          />
        ))}
      </svg>
      <div className="text-base-content/60 flex justify-between text-xs">
        <span>Q1</span>
        <span>Q{QUARTERS}</span>
      </div>
    </div>
  );
};

export const SteerPanel: FC<{
  c: number;
  gStar: number;
  uStar: number;
  growth: number;
  unemployment: number;
  steerStep: number;
  onGrowth: (value: number) => void;
  onCheck: () => void;
}> = ({
  c,
  gStar,
  uStar,
  growth,
  unemployment,
  steerStep,
  onGrowth,
  onCheck,
}) => {
  const gap = outputGap(growth, gStar);
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="text-sm">
          Year <strong>{steerStep + 1}</strong> of {STEER_ROUNDS}
        </span>
        <div className="flex gap-2">
          <Stat
            label="Target u*"
            value={`${uStar.toFixed(1)}%`}
            testid="target-unemployment"
          />
          <Stat
            label="Unemployment"
            value={`${unemployment.toFixed(1)}%`}
            testid="unemployment"
          />
        </div>
      </div>
      <UnemploymentPath
        uStart={unemployment}
        c={c}
        gStar={gStar}
        g={growth}
        uStar={uStar}
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-sm">
          <span>Real GDP growth g</span>
          <span className="font-bold">
            {growth.toFixed(1)}% · gap {formatSigned(gap)}
          </span>
        </div>
        <input
          type="range"
          min={GROWTH_MIN}
          max={GROWTH_MAX}
          step={GROWTH_STEP}
          value={growth}
          onChange={(event) => onGrowth(Number(event.target.value))}
          data-testid="growth"
          className="range range-primary range-sm"
        />
        <span data-testid="output-gap" className="text-base-content/60 text-xs">
          Output gap: {formatSigned(gap)} — growth relative to potential.
        </span>
      </div>
      <button
        type="button"
        data-testid="check"
        onClick={onCheck}
        className="btn btn-primary btn-sm self-center">
        {steerStep + 1 >= STEER_ROUNDS ? 'Finish Year' : 'Apply Growth'}
      </button>
    </div>
  );
};
