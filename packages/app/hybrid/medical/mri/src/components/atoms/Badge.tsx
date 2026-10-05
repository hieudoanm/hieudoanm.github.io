import type { ReactNode } from 'react';

const TONES = {
  neutral: 'badge-neutral',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
} as const;

export type BadgeTone = keyof typeof TONES;

export const Badge = ({
  tone = 'neutral',
  children,
  title,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  title?: string;
}) => (
  <span className={`badge ${TONES[tone]} badge-sm`} title={title}>
    {children}
  </span>
);
