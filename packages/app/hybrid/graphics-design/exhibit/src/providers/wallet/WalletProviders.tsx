'use client';

import type { ReactNode } from 'react';
import { DataProvider } from '@/providers/wallet/DataProvider';
import { SWProvider } from '@/providers/wallet/SWProvider';
import { ToastProvider } from '@/providers/wallet/ToastProvider';
import OfflineBanner from '@/components/shared/organisms/OfflineBanner';
import SkipToContent from '@/components/shared/organisms/SkipToContent';

export const WalletProviders = ({ children }: { children: ReactNode }) => (
  <SWProvider>
    <ToastProvider>
      <DataProvider>
        <SkipToContent />
        <OfflineBanner />
        {children}
      </DataProvider>
    </ToastProvider>
  </SWProvider>
);
