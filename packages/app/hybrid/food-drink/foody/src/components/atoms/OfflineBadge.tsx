'use client';

import { FC } from 'react';
import { useOffline } from '@/hooks/useOffline';
import { Badge } from './Badge';

export const OfflineBadge: FC = () => {
  const offline = useOffline();
  if (!offline) return null;
  return <Badge variant="error">Offline</Badge>;
};
