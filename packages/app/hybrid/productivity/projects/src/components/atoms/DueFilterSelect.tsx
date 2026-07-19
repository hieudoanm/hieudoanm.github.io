'use client';

import type { FC } from 'react';
import { DUE_OPTIONS, type DueFilter } from '@/types/board-filters';

interface DueFilterSelectProps {
  value: DueFilter;
  onChange: (value: DueFilter) => void;
}

export const DueFilterSelect: FC<DueFilterSelectProps> = ({
  value,
  onChange,
}) => (
  <select
    aria-label="Due date filter"
    value={value}
    onChange={(e) => onChange(e.target.value as DueFilter)}
    className="select select-bordered select-xs">
    {DUE_OPTIONS.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);
