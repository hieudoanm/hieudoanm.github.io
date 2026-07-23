'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { RouteGuard } from '@/components/RouteGuard';
import { ToastProvider } from '@/providers/ToastProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  console.log('[Providers] render');
  return (
    <ToastProvider>
      <DataProvider>
        <RouteGuard>{children}</RouteGuard>
      </DataProvider>
    </ToastProvider>
  );
};
