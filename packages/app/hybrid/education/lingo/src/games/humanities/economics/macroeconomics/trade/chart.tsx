'use client';

import { FC } from 'react';
import type { Analysis, Market } from './types';
import {
  Axes,
  Curves,
  H,
  PriceLines,
  SurfaceAreas,
  TariffAreas,
  W,
} from './chart-scaffold';

const Legend: FC = () => (
  <div className="flex flex-wrap gap-3 text-xs">
    <span className="flex items-center gap-1">
      <i className="h-2 w-2 rounded-sm bg-sky-400" /> CS
    </span>
    <span className="flex items-center gap-1">
      <i className="h-2 w-2 rounded-sm bg-emerald-400" /> PS
    </span>
    <span className="flex items-center gap-1">
      <i className="h-2 w-2 rounded-sm bg-amber-400" /> Revenue
    </span>
    <span className="flex items-center gap-1">
      <i className="h-2 w-2 rounded-sm bg-rose-400" /> DWL
    </span>
  </div>
);

export const TariffChart: FC<{ market: Market; analysis: Analysis }> = ({
  market,
  analysis,
}) => (
  <div className="flex flex-col gap-2">
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Tariff supply and demand chart">
      <Axes />
      <TariffAreas market={market} analysis={analysis} />
      <SurfaceAreas market={market} analysis={analysis} />
      <Curves market={market} />
      <PriceLines market={market} analysis={analysis} />
    </svg>
    <Legend />
  </div>
);
