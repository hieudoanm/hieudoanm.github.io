import { FC } from 'react';
import type { FitnessSnapshot } from './types';

export const ShareBar: FC<{
  labelA: string;
  labelB: string;
  pctA: number;
  pctB: number;
}> = ({ labelA, labelB, pctA, pctB }) => (
  <div className="flex flex-col gap-2">
    <div className="bg-base-300 h-4 w-full overflow-hidden rounded-full">
      <div className="flex h-full">
        <div
          data-testid="bar-a"
          className="bg-primary h-full transition-all"
          style={{ width: `${pctA}%` }}
        />
        <div
          data-testid="bar-b"
          className="bg-secondary h-full transition-all"
          style={{ width: `${pctB}%` }}
        />
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <span data-testid="share-a">
        <strong className="text-primary">{labelA}</strong> {pctA}%
      </span>
      <span data-testid="share-b">
        <strong className="text-secondary">{labelB}</strong> {pctB}%
      </span>
    </div>
  </div>
);

export const FitnessPanel: FC<{ fitness: FitnessSnapshot }> = ({ fitness }) => (
  <div
    data-testid="fitness-panel"
    className="flex flex-wrap items-center gap-4 text-sm">
    <span>
      f<sub>A</sub> = <strong>{fitness.fA.toFixed(3)}</strong>
    </span>
    <span>
      f<sub>B</sub> = <strong>{fitness.fB.toFixed(3)}</strong>
    </span>
    <span>
      mean = <strong>{fitness.mean.toFixed(3)}</strong>
    </span>
  </div>
);
