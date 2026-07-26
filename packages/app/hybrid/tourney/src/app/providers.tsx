'use client';

import type { FC, ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <DataProvider>{children}</DataProvider>
);

Providers.displayName = 'Providers';
