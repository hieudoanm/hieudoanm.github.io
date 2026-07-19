import { FC } from 'react';
import { MAX_LABOR } from './constants';
import type { CostRow } from './types';

interface CurvePoint {
  x: number;
  y: number;
}

const toPoints = (
  rows: CostRow[],
  key: keyof CostRow,
  scale: number
): CurvePoint[] =>
  rows
    .filter((r) => r.L > 0 && Number.isFinite(r[key] as number))
    .map((r) => ({
      x: 40 + (r.L / MAX_LABOR) * 440,
      y: 260 - ((r[key] as number) / scale) * 230,
    }));

const Curve: FC<{ pts: CurvePoint[]; color: string }> = ({ pts, color }) => (
  <polyline
    points={pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
    fill="none"
    stroke={color}
    strokeWidth="2"
  />
);

const LegendBox: FC<{ x: number; color: string; label: string }> = ({
  x,
  color,
  label,
}) => (
  <>
    <rect x={x} y="10" width="12" height="12" fill={color} />
    <text x={x + 16} y="20" fontSize="10">
      {label}
    </text>
  </>
);

export const CostCurvesSvg: FC<{ rows: CostRow[] }> = ({ rows }) => {
  const maxVal = rows
    .filter((r) => r.L > 0)
    .reduce((m, r) => Math.max(m, r.ATC, r.AVC, r.MC), 0);
  const scale = Math.max(5, maxVal * 1.05);
  const atc = toPoints(rows, 'ATC', scale);
  const avc = toPoints(rows, 'AVC', scale);
  const mc = toPoints(rows, 'MC', scale);
  return (
    <svg viewBox="0 0 500 300" className="w-full" data-testid="cost-curves">
      <line x1="40" y1="260" x2="480" y2="260" stroke="currentColor" />
      <line x1="40" y1="260" x2="40" y2="20" stroke="currentColor" />
      <text x="470" y="278" fontSize="10">
        L
      </text>
      <text x="14" y="22" fontSize="10">
        $
      </text>
      {atc.length > 1 && <Curve pts={atc} color="#d97706" />}
      {avc.length > 1 && <Curve pts={avc} color="#2563eb" />}
      {mc.length > 1 && <Curve pts={mc} color="#dc2626" />}
      <LegendBox x={40} color="#d97706" label="ATC" />
      <LegendBox x={108} color="#2563eb" label="AVC" />
      <LegendBox x={176} color="#dc2626" label="MC" />
    </svg>
  );
};
