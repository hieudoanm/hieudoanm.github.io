'use client';

import type { FC } from 'react';
import type { Label } from '@/types';

interface LabelFiltersProps {
  labels: Label[];
  activeLabel: string | null;
  onChange: (id: string | null) => void;
}

export const LabelFilters: FC<LabelFiltersProps> = ({
  labels,
  activeLabel,
  onChange,
}) => {
  if (labels.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase opacity-50">Labels</span>
      {labels.map((lbl) => (
        <button
          key={lbl.id}
          type="button"
          aria-pressed={activeLabel === lbl.id}
          onClick={() => onChange(activeLabel === lbl.id ? null : lbl.id)}
          className={`badge badge-sm cursor-pointer ${
            activeLabel === lbl.id ? '' : 'opacity-30'
          }`}
          style={{ backgroundColor: lbl.color, color: 'white' }}>
          {lbl.name}
        </button>
      ))}
    </div>
  );
};
