import { FC } from 'react';

export const AccentBadge: FC<{ label: string }> = ({ label }) => (
  <span className="badge badge-accent badge-outline text-[10px]">{label}</span>
);

AccentBadge.displayName = 'AccentBadge';
