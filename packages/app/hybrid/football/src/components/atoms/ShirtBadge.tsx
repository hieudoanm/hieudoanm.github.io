'use client';

import { roleClasses, slotRole } from '@/lib/pitch';
import { FC } from 'react';

interface ShirtBadgeProps {
  number: number;
  label?: string;
  size?: 'sm' | 'md';
  color?: string;
}

export const ShirtBadge: FC<ShirtBadgeProps> = ({
  number,
  label,
  size = 'md',
  color,
}) => {
  const role = slotRole(label ?? '');
  const box = size === 'sm' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm';
  const classes = color
    ? `${box} flex items-center justify-center rounded border font-bold text-white`
    : `${box} ${roleClasses(role)} flex items-center justify-center rounded border font-bold`;
  return (
    <span
      aria-hidden={true}
      className={classes}
      style={
        color ? { backgroundColor: color, borderColor: color } : undefined
      }>
      {number}
    </span>
  );
};

ShirtBadge.displayName = 'ShirtBadge';
