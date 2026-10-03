'use client';

import { ReactNode } from 'react';
import { DataProvider } from '@/providers/wallet/DataProvider';
import { SWProvider } from '@/providers/wallet/SWProvider';
import { ToastProvider } from '@/providers/wallet/ToastProvider';
import OfflineBanner from '@/components/shared/organisms/OfflineBanner';
import SkipToContent from '@/components/shared/organisms/SkipToContent';

export const Providers = ({ children }: { children: ReactNode }) => {
  console.log('[Providers] render');
  return (
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
};
