import { FC } from 'react';

interface DemandChartProps {
  a: number;
  b: number;
  mc: number;
  q: number;
  bestQ: number;
}

const WIDTH = 320;
const HEIGHT = 200;
const PAD = 36;
const MAX_H = HEIGHT - PAD - 18;
const AXIS_W = WIDTH - PAD - 14;

const fmt = (n: number): string => `$${Math.round(n)}`;

export const DemandChart: FC<DemandChartProps> = ({ a, b, mc, q, bestQ }) => {
  const qMax = Math.max(8, Math.round((a - mc) / b) + 10, bestQ + 10);
  const qx = (qq: number): number => PAD + (qq / qMax) * AXIS_W;
  const py = (p: number): number =>
    HEIGHT - PAD - Math.max(0, Math.min(1, p / a)) * MAX_H;
  const qc = (a - mc) / b;
  const pAt = (qq: number): number => a - b * qq;
  const triangle = [
    [qx(Math.min(q, qc)), py(mc)],
    [qx(Math.max(q, qc)), py(mc)],
    [qx(q), py(pAt(q))],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
  const bestX = qx(bestQ);
  const bestY = py(pAt(bestQ));
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-48 w-full"
      role="img"
      aria-label="Demand, marginal revenue, and deadweight loss chart"
      data-testid="demand-chart">
      <line
        x1={qx(0)}
        y1={py(a)}
        x2={qx(qMax)}
        y2={py(pAt(qMax))}
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1={qx(0)}
        y1={py(mc)}
        x2={qx(qMax)}
        y2={py(mc)}
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <line
        x1={qx(0)}
        y1={py(a)}
        x2={Math.min(qx(a / (2 * b)), WIDTH - 14)}
        y2={py(0)}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.6"
      />
      <line
        x1={bestX}
        y1={py(a)}
        x2={bestX}
        y2={bestY}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.8"
      />
      <line
        x1={qx(0)}
        y1={bestY}
        x2={bestX}
        y2={bestY}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.8"
      />
      <polygon points={triangle} fill="currentColor" opacity="0.22" />
      <circle
        cx={qx(q)}
        cy={py(pAt(q))}
        r="4"
        fill="currentColor"
        stroke="var(--color-base-100, #fff)"
        strokeWidth="1.5"
      />
      <text x={PAD} y={py(a) + 8} fontSize="11">
        {fmt(a)}
      </text>
      <text x={PAD} y={py(mc) + 8} fontSize="11">
        {fmt(mc)}
      </text>
      <text x={qx(qMax)} y={HEIGHT - 4} fontSize="11" textAnchor="end">
        {qMax}
      </text>
      <text x={bestX + 3} y={py(a) - 4} fontSize="11" opacity="0.9">
        Q*
      </text>
    </svg>
  );
};
