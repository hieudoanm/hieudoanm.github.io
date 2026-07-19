'use client';

import { FC, ReactNode } from 'react';
import { useSWRegister } from '@/hooks/useSWRegister';

export const SWProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useSWRegister();
  return <>{children}</>;
};
