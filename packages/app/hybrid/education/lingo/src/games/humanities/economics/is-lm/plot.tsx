import type { FC } from 'react';
import { equilibrium, isCurve, lmCurve } from './game';

export const EquilibriumPlot: FC<{
  a: number;
  c: number;
  b: number;
  d: number;
}> = ({ a, c, b, d }) => {
  const eq = equilibrium(a, c, b, d);
  const yMin = 0;
  const yMax = Math.max(a, c / -d || 0) + 1;
  const rMin = 0;
  const rMax = Math.max(a, c + d * yMax) + 1;
  const toX = (y: number): number => ((y - yMin) / (yMax - yMin)) * 300;
  const toY = (r: number): number => 200 - ((r - rMin) / (rMax - rMin)) * 180;
  return (
    <svg
      viewBox="0 0 320 220"
      className="border-base-300 h-48 w-full rounded-lg border"
      role="img"
      aria-label="IS-LM diagram">
      <line
        x1={20}
        y1={200}
        x2={320}
        y2={200}
        stroke="currentColor"
        strokeWidth={1}
      />
      <line
        x1={20}
        y1={10}
        x2={20}
        y2={200}
        stroke="currentColor"
        strokeWidth={1}
      />
      <line
        x1={toX(yMin)}
        y1={toY(isCurve(a, b, yMin))}
        x2={toX(yMax)}
        y2={toY(isCurve(a, b, yMax))}
        stroke="#6366f1"
        strokeWidth={2.5}
      />
      <line
        x1={toX(yMin)}
        y1={toY(lmCurve(c, d, yMin))}
        x2={toX(yMax)}
        y2={toY(lmCurve(c, d, yMax))}
        stroke="#f59e0b"
        strokeWidth={2.5}
      />
      <circle cx={toX(eq.y)} cy={toY(eq.r)} r={5} fill="#10b981" />
    </svg>
  );
};
