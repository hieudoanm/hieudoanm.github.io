'use client';

import { FC } from 'react';
import { demandAt, supplyAt } from './game';
import type { Analysis, Market } from './types';

export const W = 460;
export const H = 340;
const ML = 46;
const MR = 8;
const MT = 14;
const MB = 34;
export const PW = W - ML - MR;
export const PH = H - MT - MB;
export const P_MAX = 100;
export const Q_MAX = 200;

export const x = (q: number): number => ML + (Math.min(q, Q_MAX) / Q_MAX) * PW;
export const yy = (p: number): number =>
  MT + (1 - Math.min(p, P_MAX) / P_MAX) * PH;
const poly = (points: [number, number][]): string =>
  points.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');

export const Axes: FC = () => (
  <g>
    <line x1={ML} y1={0} x2={ML} y2={MT + PH} stroke="#cbd5e1" />
    <line x1={ML} y1={MT + PH} x2={ML + PW} y2={MT + PH} stroke="#cbd5e1" />
    {[0, 50, 100, 150, 200].map((q) => (
      <text
        key={q}
        x={x(q)}
        y={MT + PH + 12}
        className="fill-slate-400 text-[9px]"
        textAnchor="middle">
        {q}
      </text>
    ))}
    {[0, 25, 50, 75, 100].map((p) => (
      <text
        key={p}
        x={ML - 5}
        y={yy(p) + 3}
        className="fill-slate-400 text-[9px]"
        textAnchor="end">
        {p}
      </text>
    ))}
  </g>
);

export const Curves: FC<{ market: Market }> = ({ market }) => {
  const dz = Math.min(Q_MAX, market.ad / market.bd);
  const sy = Math.min(P_MAX, market.as + market.bs * Q_MAX);
  return (
    <g>
      <line
        x1={x(0)}
        y1={yy(market.ad)}
        x2={x(dz)}
        y2={yy(0)}
        stroke="#0284c7"
        strokeWidth={2}
      />
      <text
        x={x(dz) - 6}
        y={yy(market.ad) + 12}
        className="fill-sky-600 text-[10px]">
        D
      </text>
      <line
        x1={x(0)}
        y1={yy(market.as)}
        x2={x(Q_MAX)}
        y2={yy(sy)}
        stroke="#059669"
        strokeWidth={2}
      />
      <text
        x={x(Q_MAX) - 4}
        y={yy(sy) - 4}
        className="fill-emerald-600 text-[10px]">
        S
      </text>
    </g>
  );
};

export const PriceLines: FC<{ market: Market; analysis: Analysis }> = ({
  market,
  analysis,
}) => (
  <g>
    <line
      x1={ML}
      y1={yy(market.worldP)}
      x2={ML + PW}
      y2={yy(market.worldP)}
      stroke="#94a3b8"
      strokeDasharray="4 3"
    />
    <text
      x={2}
      y={yy(market.worldP) - 3}
      className="fill-slate-500 text-[10px]">
      Pw
    </text>
    <line
      x1={ML}
      y1={yy(analysis.priceAfter)}
      x2={ML + PW}
      y2={yy(analysis.priceAfter)}
      stroke="#dc2626"
    />
    <text
      x={2}
      y={yy(analysis.priceAfter) - 3}
      className="fill-red-600 text-[10px]">
      Pw·(1+t)
    </text>
  </g>
);

export const SurfaceAreas: FC<{ market: Market; analysis: Analysis }> = ({
  market,
  analysis,
}) => {
  const pt = analysis.priceAfter;
  const qd = analysis.demandAtPriceAfter;
  const qs = analysis.supplyAtPriceAfter;
  return (
    <g>
      <polygon
        points={poly([
          [x(0), yy(pt)],
          [x(0), yy(market.ad)],
          [x(qd), yy(pt)],
        ])}
        fill="#38bdf8"
        fillOpacity={0.3}
        stroke="#0284c7"
      />
      <text
        x={x(qd / 2)}
        y={yy((pt + market.ad) / 2)}
        className="fill-sky-700 text-[10px]">
        CS
      </text>
      <polygon
        points={poly([
          [x(0), yy(market.as)],
          [x(0), yy(pt)],
          [x(qs), yy(pt)],
        ])}
        fill="#34d399"
        fillOpacity={0.3}
        stroke="#059669"
      />
      <text
        x={x(qs / 2)}
        y={yy((pt + market.as) / 2)}
        className="fill-emerald-700 text-[10px]">
        PS
      </text>
    </g>
  );
};

export const TariffAreas: FC<{ market: Market; analysis: Analysis }> = ({
  market,
  analysis,
}) => {
  const pt = analysis.priceAfter;
  const pw = market.worldP;
  const qd = analysis.demandAtPriceAfter;
  const qs = analysis.supplyAtPriceAfter;
  const qdPw = demandAt(market, pw);
  const qsPw = supplyAt(market, pw);
  if (qd <= qs) return null;
  return (
    <g>
      <polygon
        points={poly([
          [x(qs), yy(pt)],
          [x(qd), yy(pt)],
          [x(qd), yy(pw)],
          [x(qs), yy(pw)],
        ])}
        fill="#fbbf24"
        fillOpacity={0.35}
        stroke="#d97706"
      />
      <text
        x={x((qs + qd) / 2)}
        y={yy((pt + pw) / 2)}
        className="fill-amber-700 text-[10px]">
        Revenue
      </text>
      <polygon
        points={poly([
          [x(qd), yy(pw)],
          [x(qdPw), yy(pw)],
          [x(qd), yy(pt)],
        ])}
        fill="#f87171"
        fillOpacity={0.6}
      />
      <polygon
        points={poly([
          [x(qsPw), yy(pw)],
          [x(qs), yy(pw)],
          [x(qs), yy(pt)],
        ])}
        fill="#f87171"
        fillOpacity={0.6}
      />
      <text
        x={x((qd + qdPw) / 2 - 8)}
        y={yy((pw + pt) / 2 - 6)}
        className="fill-rose-600 text-[10px]">
        DWL
      </text>
    </g>
  );
};
