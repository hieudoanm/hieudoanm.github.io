import { FC } from 'react';

import { type BeckItem } from '../utils';

interface OptionsStepProps {
  items: BeckItem[];
  selected: number[];
  onChange: (index: number, optionIndex: number) => void;
}

export const OptionsStep: FC<OptionsStepProps> = ({
  items,
  selected,
  onChange,
}) => (
  <div className="space-y-3">
    {items.map((item, i) => (
      <div
        key={item.id}
        className="bg-base-200 border-base-300 rounded-box border p-3">
        <p className="mb-2 text-xs font-semibold">
          {item.id}. {item.label}
        </p>
        <div className="space-y-1">
          {item.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              onClick={() => onChange(i, optionIndex)}
              className={`btn btn-xs w-full justify-start text-left ${selected[i] === optionIndex ? 'btn-primary' : 'btn-ghost'}`}>
              <span className="w-5 text-right font-mono opacity-50">
                {option.value}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

OptionsStep.displayName = 'OptionsStep';
