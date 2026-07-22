'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { RouteGuard } from '@/components/RouteGuard';
import { ToastProvider } from '@/providers/ToastProvider';
import OfflineBanner from '@/components/OfflineBanner';
import SkipToContent from '@/components/SkipToContent';

export const Providers = ({ children }: { children: ReactNode }) => {
  console.log('[Providers] render');
  return (
    <ToastProvider>
      <DataProvider>
        <RouteGuard>
          <SkipToContent />
          <OfflineBanner />
          {children}
        </RouteGuard>
      </DataProvider>
    </ToastProvider>
  );
};
