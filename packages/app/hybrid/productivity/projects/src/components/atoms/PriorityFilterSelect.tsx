'use client';

import type { FC } from 'react';
import { PRIORITY_OPTIONS, type PriorityFilter } from '@/types/board-filters';

interface PriorityFilterSelectProps {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
}

export const PriorityFilterSelect: FC<PriorityFilterSelectProps> = ({
  value,
  onChange,
}) => (
  <select
    aria-label="Priority filter"
    value={value}
    onChange={(e) => onChange(e.target.value as PriorityFilter)}
    className="select select-bordered select-xs">
    {PRIORITY_OPTIONS.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);
