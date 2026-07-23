'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { RouteGuard } from '@/components/RouteGuard';
import { ToastProvider } from '@/providers/ToastProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <DataProvider>
        <RouteGuard>{children}</RouteGuard>
      </DataProvider>
    </ToastProvider>
  );
}
