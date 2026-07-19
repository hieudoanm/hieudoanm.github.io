'use client';

import { type FC } from 'react';
import { FilterChip } from '@/components/atoms/FilterChip';
import { PLATFORM_LABELS, type Platform } from '@/lib/os';
import { ALL_PLATFORMS } from '@/lib/types';

interface PlatformFilterProps {
  active: Platform | 'all';
  onChange: (p: Platform | 'all') => void;
}

export const PlatformFilter: FC<PlatformFilterProps> = ({
  active,
  onChange,
}) => (
  <div className="mb-2 w-full max-w-3xl">
    <p className="text-base-content/50 mb-2 font-mono text-[10px] tracking-widest uppercase">
      Platform
    </p>
    <div className="flex flex-wrap items-center gap-1.5">
      <FilterChip
        label="All"
        active={active === 'all'}
        onClick={() => onChange('all')}
      />
      {ALL_PLATFORMS.map((group) => (
        <span key={group.group} className="flex items-center gap-1.5">
          <span className="text-base-content/20">|</span>
          {group.platforms.map((p) => (
            <FilterChip
              key={p}
              label={PLATFORM_LABELS[p as Platform]}
              active={active === p}
              onClick={() => onChange(p as Platform)}
            />
          ))}
        </span>
      ))}
    </div>
  </div>
);

PlatformFilter.displayName = 'PlatformFilter';
