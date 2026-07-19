'use client';

import { FC, ReactNode } from 'react';
import { useUpdater } from '@/hooks/useUpdater';

export const NativeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useUpdater();
  return <>{children}</>;
};
