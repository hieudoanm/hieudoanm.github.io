'use client';

import { roleClasses, slotRole } from '@/lib/pitch';
import { FC } from 'react';

interface ShirtBadgeProps {
  number: number;
  label?: string;
  size?: 'sm' | 'md';
}

export const ShirtBadge: FC<ShirtBadgeProps> = ({
  number,
  label,
  size = 'md',
}) => {
  const role = slotRole(label ?? '');
  const box = size === 'sm' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm';
  return (
    <span
      aria-hidden={true}
      className={`${box} ${roleClasses(role)} flex items-center justify-center rounded border font-bold`}>
      {number}
    </span>
  );
};

ShirtBadge.displayName = 'ShirtBadge';
