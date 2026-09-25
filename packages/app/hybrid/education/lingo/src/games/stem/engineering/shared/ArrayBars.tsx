'use client';

import type { FC } from 'react';
import type { AuxBuffer, CellState } from './types';

/**
 * Maps a cell's semantic state to a bar colour.
 *
 * Tailwind needs whole class names, so the state-to-class table is built here
 * rather than interpolated at the call site.
 */
const STATE_CLASS: Record<CellState, string> = {
  idle: 'bg-base-content/20',
  active: 'bg-info/70',
  compare: 'bg-warning/80',
  swap: 'bg-error/80',
  pivot: 'bg-secondary/80',
  sorted: 'bg-success/70',
  found: 'bg-success',
  miss: 'bg-error/60',
  overwritten: 'bg-warning/60',
  taken: 'bg-info/60',
  rejected: 'bg-base-content/10',
};

const stateClass = (state: CellState): string =>
  STATE_CLASS[state] ?? STATE_CLASS.idle;

export const ArrayBars: FC<{
  values: number[];
  states: CellState[];
  range?: [number, number];
  label?: string;
}> = ({ values, states, range, label = 'Array' }) => {
  const max = Math.max(1, ...values.map((v) => Math.abs(v)));
  return (
    <div className="flex flex-col gap-2" data-testid="array-bars">
      <span className="text-base-content/50 text-xs font-medium">{label}</span>
      <div className="flex h-40 items-end gap-1">
        {values.map((value, i) => {
          const inRange = !range || (i >= range[0] && i <= range[1]);
          return (
            <div
              key={i}
              data-testid={`bar-${i}`}
              data-state={states[i] ?? 'idle'}
              className={`flex-1 rounded-t transition-all duration-150 ${stateClass(
                states[i] ?? 'idle'
              )} ${inRange ? '' : 'opacity-25'}`}
              style={{ height: `${(Math.abs(value) / max) * 100}%` }}>
              <span className="text-base-content/70 block text-center text-[10px]">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AuxRow: FC<{ buffer: AuxBuffer; states?: CellState[] }> = ({
  buffer,
  states = [],
}) => (
  <div className="flex flex-col gap-2" data-testid="aux-row">
    <span className="text-base-content/50 text-xs font-medium">
      {buffer.label}
    </span>
    <div className="flex h-10 items-center gap-1">
      {buffer.values.map((value, i) => (
        <div
          key={i}
          data-testid={`aux-${i}`}
          className={`flex h-full flex-1 items-center justify-center rounded border text-xs ${
            value === null
              ? 'border-base-content/10 text-base-content/20 border border-dashed'
              : 'border-base-content/20 bg-base-200 font-mono'
          } ${states[i] ? stateClass(states[i]) : ''}`}>
          {value ?? '·'}
        </div>
      ))}
    </div>
  </div>
);
