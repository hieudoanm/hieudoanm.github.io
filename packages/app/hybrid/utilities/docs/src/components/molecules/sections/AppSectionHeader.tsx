'use client';

import type { FC } from 'react';

interface AppSectionHeaderProps {
  label: string;
  description: string;
  count: number;
}

export const AppSectionHeader: FC<AppSectionHeaderProps> = ({
  label,
  description,
  count,
}) => (
  <div className="mb-4">
    <h2 className="text-lg font-light tracking-tight">
      {label} ({count})
    </h2>
    <p className="text-base-content/40 text-xs">{description}</p>
  </div>
);

AppSectionHeader.displayName = 'AppSectionHeader';
