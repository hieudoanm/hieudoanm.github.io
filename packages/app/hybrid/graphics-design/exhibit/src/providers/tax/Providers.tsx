'use client';

import { type ReactNode } from 'react';
import { DataProvider } from '@/providers/tax/DataProvider';
import { ToastProvider } from '@/providers/tax/ToastProvider';
import OfflineBanner from '@/components/shared/organisms/OfflineBanner';
import SkipToContent from '@/components/shared/organisms/SkipToContent';

export const Providers = ({ children }: { children: ReactNode }) => {
  console.log('[Providers] render');
  return (
    <ToastProvider>
      <DataProvider>
        <SkipToContent />
        <OfflineBanner />
        {children}
      </DataProvider>
    </ToastProvider>
  );
};
