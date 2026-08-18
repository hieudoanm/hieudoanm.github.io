import { FC } from 'react';

import { type ScaleItem } from '../utils';

interface ScaleStepProps {
  items: ScaleItem[];
  values: number[];
  hint: string;
  onChange: (index: number, value: number) => void;
}

export const ScaleStep: FC<ScaleStepProps> = ({
  items,
  values,
  hint,
  onChange,
}) => (
  <div className="space-y-2">
    <p className="text-base-content/40 text-xs">{hint}</p>
    {items.map((item, i) => (
      <div
        key={item.id}
        className="bg-base-200 border-base-300 rounded-box flex items-center gap-3 border p-2">
        <span className="text-base-content/40 w-6 font-mono text-xs">
          {item.id}
        </span>
        <span className="flex-1 text-xs">{item.text}</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
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

ScaleStep.displayName = 'ScaleStep';
