import { FC } from 'react';

import { GAD_OPTIONS, type GadItem } from '../utils';

interface FrequencyStepProps {
  items: GadItem[];
  values: number[];
  onChange: (index: number, value: number) => void;
}

export const FrequencyStep: FC<FrequencyStepProps> = ({
  items,
  values,
  onChange,
}) => (
  <div className="space-y-2">
    <p className="text-base-content/40 text-xs">
      Over the last 2 weeks, how often have you been bothered by the following
      problems?
    </p>
    {items.map((item, i) => (
      <div
        key={item.id}
        className="bg-base-200 border-base-300 rounded-box border p-2">
        <div className="flex items-center gap-3">
          <span className="text-base-content/40 w-6 font-mono text-xs">
            {item.id}
          </span>
          <span className="flex-1 text-xs">{item.text}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1 pl-9">
          {GAD_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(i, option.value)}
              className={`btn btn-xs ${values[i] === option.value ? 'btn-primary' : 'btn-ghost'}`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

FrequencyStep.displayName = 'FrequencyStep';
