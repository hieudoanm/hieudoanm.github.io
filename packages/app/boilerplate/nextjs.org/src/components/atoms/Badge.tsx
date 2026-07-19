import type { FC, ReactNode } from 'react';

type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  outline?: boolean;
  children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  variant = 'neutral',
  outline = false,
  children,
}) => (
  <span className={`badge badge-${variant}${outline ? 'badge-outline' : ''}`}>
    {children}
  </span>
);
