import type { FC } from 'react';

import { R_OUTER } from '../constants';

export const RingsLayer: FC<{
  rings: number;
  ticks: number;
  ringStep: number;
  rotation: number;
}> = ({ rings, ticks, ringStep, rotation }) => (
  <g>
    {Array.from({ length: rings }).map((_, l) => (
      <circle
        key={l}
        cx={50}
        cy={50}
        r={R_OUTER - l * ringStep}
        className="fill-none stroke-white/6"
        strokeWidth={0.25}
      />
    ))}
    {Array.from({ length: ticks }).map((_, i) => {
      const ang = (-90 + rotation + i * (360 / ticks)) * (Math.PI / 180);
      const r1 = R_OUTER + 1.5;
      const r2 = R_OUTER + 3.2;
      return (
        <line
          key={i}
          x1={50 + r1 * Math.cos(ang)}
          y1={50 + r1 * Math.sin(ang)}
          x2={50 + r2 * Math.cos(ang)}
          y2={50 + r2 * Math.sin(ang)}
          className="stroke-white/8"
          strokeWidth={0.3}
        />
      );
    })}
  </g>
);
