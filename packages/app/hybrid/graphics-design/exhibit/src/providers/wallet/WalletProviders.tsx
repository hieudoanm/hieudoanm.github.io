'use client';

import type { ReactNode } from 'react';
import { DataProvider } from '@/providers/wallet/DataProvider';
import { SWProvider } from '@/providers/wallet/SWProvider';
import { ToastProvider } from '@/providers/wallet/ToastProvider';
import { RouteGuard } from '@/components/wallet/RouteGuard';
import OfflineBanner from '@/components/wallet/OfflineBanner';
import SkipToContent from '@/components/wallet/SkipToContent';

export const WalletProviders = ({ children }: { children: ReactNode }) => (
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
