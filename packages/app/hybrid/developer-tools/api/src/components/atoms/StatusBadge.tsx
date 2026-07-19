'use client';

import { statusColor } from '@/lib/format';
import { type FC } from 'react';

interface StatusBadgeProps {
  status: number;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <span className={`badge ${statusColor(status)}`}>{status}</span>
);

StatusBadge.displayName = 'StatusBadge';
