'use client';

import { useSWRegister } from '@/hooks/useSWRegister';
import { type FC, type ReactNode } from 'react';

export const SWProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useSWRegister();
  return <>{children}</>;
};
