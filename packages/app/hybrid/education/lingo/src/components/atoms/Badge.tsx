import type { FC, ReactNode } from 'react';

export interface BadgeProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  children: ReactNode;
}

const variantClass: Record<NonNullable<BadgeProps['variant']>, string> = {
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  neutral: 'badge-neutral',
};

export const Badge: FC<BadgeProps> = ({ variant = 'neutral', children }) => (
  <span className={`badge ${variantClass[variant]}`}>{children}</span>
);
