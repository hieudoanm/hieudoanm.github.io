'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/wallet/DataProvider';
import { RouteGuard } from '@/components/wallet/RouteGuard';
import { SWProvider } from '@/providers/wallet/SWProvider';
import { ToastProvider } from '@/providers/wallet/ToastProvider';
import OfflineBanner from '@/components/wallet/OfflineBanner';
import SkipToContent from '@/components/wallet/SkipToContent';

export const Providers = ({ children }: { children: ReactNode }) => {
  console.log('[Providers] render');
  return (
    <SWProvider>
      <ToastProvider>
        <DataProvider>
          <RouteGuard>
            <SkipToContent />
            <OfflineBanner />
            {children}
          </RouteGuard>
        </DataProvider>
      </ToastProvider>
    </SWProvider>
  );
};
