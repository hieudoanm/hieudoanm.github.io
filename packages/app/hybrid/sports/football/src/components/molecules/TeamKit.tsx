'use client';

import { ShirtBadge } from '@/components/atoms/ShirtBadge';
import { FC } from 'react';
import { FiShield } from 'react-icons/fi';

const PRESET_COLORS = [
  { value: '#dc2626', label: 'red' },
  { value: '#2563eb', label: 'blue' },
  { value: '#16a34a', label: 'green' },
  { value: '#ca8a04', label: 'gold' },
  { value: '#7c3aed', label: 'purple' },
  { value: '#111827', label: 'black' },
  { value: '#ffffff', label: 'white' },
  { value: '#0d9488', label: 'teal' },
];

interface TeamKitProps {
  value: string;
  onChange: (color: string) => void;
}

export const TeamKit: FC<TeamKitProps> = ({ value, onChange }) => (
  <div className="rounded-box flex flex-col gap-2 border border-white/10 p-2">
    <span className="text-base-content/50 flex items-center gap-1 text-xs font-bold uppercase">
      <FiShield className="size-3" />
      Team kit
    </span>
    <div className="flex items-center gap-3">
      <ShirtBadge number={10} label="GK" color={value} />
      <div className="flex flex-wrap items-center gap-1.5">
        {PRESET_COLORS.map((swatch) => {
          const active = value.toLowerCase() === swatch.value;
          return (
            <button
              key={swatch.value}
              type="button"
              aria-label={`Kit colour ${swatch.label}`}
              aria-pressed={active}
              onClick={() => onChange(swatch.value)}
              className={`size-6 rounded-full border ${
                active
                  ? 'ring-base-content ring-2 ring-offset-2'
                  : 'border-white/20'
              }`}
              style={{ backgroundColor: swatch.value }}
            />
          );
        })}
      </div>
    </div>
    <label className="flex items-center justify-between gap-2">
      <span className="text-base-content/60 text-xs">Custom colour</span>
      <input
        type="color"
        aria-label="Kit colour"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-12 cursor-pointer rounded border border-white/20 bg-transparent"
      />
    </label>
    <p className="text-base-content/40 text-xs">
      The kit colour is used on the pitch markers for this squad.
    </p>
  </div>
);

TeamKit.displayName = 'TeamKit';
