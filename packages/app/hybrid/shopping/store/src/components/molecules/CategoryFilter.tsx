'use client';

import { type FC } from 'react';
import { FilterChip } from '@/components/atoms/FilterChip';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  active,
  onChange,
}) => (
  <div className="mb-4 w-full max-w-3xl">
    <p className="text-base-content/50 mb-2 font-mono text-[10px] tracking-widest uppercase">
      Category
    </p>
    <div className="flex flex-wrap gap-1.5">
      <FilterChip
        label="All"
        active={active === 'all'}
        onClick={() => onChange('all')}
      />
      {categories.map((c) => (
        <FilterChip
          key={c}
          label={c}
          active={active === c}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  </div>
);

CategoryFilter.displayName = 'CategoryFilter';
