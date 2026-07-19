'use client';

import { FC, ReactNode } from 'react';

type BadgeVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  neutral: 'badge-neutral',
};

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({ variant = 'neutral', children }) => (
  <span className={`badge ${VARIANT_CLASS[variant]} gap-1`}>{children}</span>
);
