import type { FC } from 'react';
import type { CalculatorResult } from './types';

export const ResultsPanel: FC<{ result: CalculatorResult }> = ({ result }) => (
  <div className="grid grid-cols-2 gap-2 text-sm">
    <div data-testid="future-value" className="bg-success/10 rounded-lg p-3">
      <div className="text-base-content/60 text-xs">Future Value</div>
      <div className="text-lg font-bold">
        ${Math.round(result.fv).toLocaleString('en-US')}
      </div>
    </div>
    <div data-testid="present-value" className="bg-info/10 rounded-lg p-3">
      <div className="text-base-content/60 text-xs">Present Value</div>
      <div className="text-lg font-bold">
        ${Math.round(result.pv).toLocaleString('en-US')}
      </div>
    </div>
    <div data-testid="doubling-time" className="bg-warning/10 rounded-lg p-3">
      <div className="text-base-content/60 text-xs">Doubling Time</div>
      <div className="text-lg font-bold">
        {Number.isFinite(result.doublingTime)
          ? `${result.doublingTime.toFixed(1)} yr`
          : 'N/A'}
      </div>
    </div>
    <div data-testid="rule-72" className="bg-secondary/10 rounded-lg p-3">
      <div className="text-base-content/60 text-xs">Rule of 72</div>
      <div className="text-lg font-bold">
        {Number.isFinite(result.rule72)
          ? `${result.rule72.toFixed(1)} yr`
          : 'N/A'}
      </div>
    </div>
  </div>
);
ResultsPanel.displayName = 'ResultsPanel';

export const GrowthCurve: FC<{
  points: { year: number; value: number }[];
  principal: number;
}> = ({ points, principal }) => {
  const maxY = Math.max(...points.map((p) => p.value), principal);
  const maxX = points.length - 1;
  if (maxX <= 0) return null;
  const path = points
    .map((p, i) => {
      const x = (i / maxX) * 380 + 10;
      const y = 190 - (p.value / (maxY || 1)) * 170;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 400 200" className="w-full">
      <path d={path} fill="none" stroke="oklch(var(--p))" strokeWidth="2" />
      {points
        .filter((_, i) => i % 5 === 0 || i === points.length - 1)
        .map((p) => {
          const x = (points.indexOf(p) / maxX) * 380 + 10;
          const y = 190 - (p.value / (maxY || 1)) * 170;
          return (
            <g key={p.year}>
              <circle cx={x} cy={y} r="3" fill="oklch(var(--p))" />
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                className="fill-base-content text-[10px]">
                ${Math.round(p.value / 1000)}k
              </text>
            </g>
          );
        })}
    </svg>
  );
};
GrowthCurve.displayName = 'GrowthCurve';

export const DoublingTimeline: FC<{
  doublingTime: number;
  years: number;
}> = ({ doublingTime: dt, years }) => {
  if (!Number.isFinite(dt) || dt <= 0) return null;
  const maxYear = Math.max(years, Math.ceil(dt) + 1);
  const events: { year: number; label: string }[] = [];
  let next = dt;
  while (next <= maxYear + 0.5) {
    events.push({ year: next, label: '2×' });
    next += dt;
  }
  return (
    <div data-testid="timeline" className="mt-3">
      <div className="text-base-content/60 mb-1 text-xs font-medium">
        Doubling Timeline
      </div>
      <svg viewBox="0 0 400 50" className="w-full">
        <line
          x1="10"
          y1="25"
          x2="390"
          y2="25"
          stroke="oklch(var(--bc) / 0.2)"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="30"
          x2="10"
          y2="20"
          stroke="oklch(var(--bc) / 0.3)"
          strokeWidth="1"
        />
        <text
          x="10"
          y="45"
          textAnchor="middle"
          className="fill-base-content text-[9px]">
          0
        </text>
        {events.map((e, i) => {
          const x = 10 + (e.year / maxYear) * 380;
          return (
            <g key={i}>
              <line
                x1={x}
                y1="30"
                x2={x}
                y2="20"
                stroke="oklch(var(--p))"
                strokeWidth="2"
              />
              <text
                x={x}
                y="45"
                textAnchor="middle"
                className="fill-primary text-[9px] font-bold">
                {e.label} @ {e.year.toFixed(1)}y
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
DoublingTimeline.displayName = 'DoublingTimeline';
