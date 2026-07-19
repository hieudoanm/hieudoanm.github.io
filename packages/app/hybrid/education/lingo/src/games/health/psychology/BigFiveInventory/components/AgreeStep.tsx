import { FC } from 'react';

import { type BigFiveItem } from '../utils';

interface AgreeStepProps {
  items: BigFiveItem[];
  values: number[];
  onChange: (index: number, value: number) => void;
}

const OPTIONS = [
  { value: 1, label: 'Disagree strongly' },
  { value: 2, label: 'Disagree a little' },
  { value: 3, label: 'Neither agree nor disagree' },
  { value: 4, label: 'Agree a little' },
  { value: 5, label: 'Agree strongly' },
];

export const AgreeStep: FC<AgreeStepProps> = ({ items, values, onChange }) => (
  <div className="space-y-2">
    <div className="flex flex-wrap gap-1">
      {OPTIONS.map(({ value, label }) => (
        <span
          key={value}
          className="badge badge-ghost badge-xs font-mono normal-case">
          {value} · {label}
        </span>
      ))}
    </div>
    {items.map((item, i) => (
      <div
        key={item.id}
        className="bg-base-200 border-base-300 rounded-box flex items-center gap-3 border p-2">
        <span className="text-base-content/40 w-6 font-mono text-xs">
          {item.id}
        </span>
        <span className="flex-1 text-xs">{item.text}</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange(i, value)}
              className={`btn btn-xs h-7 w-7 ${values[i] === value ? 'btn-primary' : 'btn-ghost'}`}>
              {value}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

AgreeStep.displayName = 'AgreeStep';
