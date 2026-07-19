'use client';

import { type FC, type ReactNode } from 'react';
import { OfflineBadge } from '@/components/atoms/OfflineBadge';
import { useUpdater } from '@/hooks/useUpdater';

export const NativeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useUpdater();
  return (
    <>
      {children}
      <OfflineBadge />
    </>
  );
};
