'use client';

import type { FC } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { useOffline } from '@/hooks/useOffline';

export const OfflineBadge: FC = () => {
  const offline = useOffline();
  if (!offline) return null;
  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Badge variant="warning">Offline</Badge>
    </div>
  );
};
