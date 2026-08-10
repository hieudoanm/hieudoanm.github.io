import { FC } from 'react';

import { TIME_SLOTS, type TimeEntry } from '../utils';

interface TimeStepProps {
  values: TimeEntry[];
  onChange: (index: number, field: 'hours' | 'minutes', value: number) => void;
}

export const TimeStep: FC<TimeStepProps> = ({ values, onChange }) => (
  <div className="space-y-3">
    {TIME_SLOTS.map((slot, i) => (
      <div
        key={slot.label}
        className="bg-base-200 border-base-300 rounded-box border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-normal">{slot.label}</h3>
          <span className="text-base-content/40 text-xs">{slot.hint}</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="number"
            min={0}
            placeholder="0"
            value={values[i].hours || ''}
            onChange={(e) =>
              onChange(i, 'hours', Math.max(0, Number(e.target.value) || 0))
            }
            className="input input-bordered input-sm w-20"
          />
          <span className="opacity-60">hour(s)</span>
          <input
            type="number"
            min={0}
            max={59}
            placeholder="0"
            value={values[i].minutes || ''}
            onChange={(e) =>
              onChange(
                i,
                'minutes',
                Math.min(59, Math.max(0, Number(e.target.value) || 0))
              )
            }
            className="input input-bordered input-sm w-20"
          />
          <span className="opacity-60">min</span>
        </div>
      </div>
    ))}
  </div>
);

TimeStep.displayName = 'TimeStep';
