'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <DataProvider>{children}</DataProvider>;
}
