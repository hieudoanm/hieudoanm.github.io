'use client';

import { type FC, type ReactNode } from 'react';
import { DataProvider } from '@/providers/gallery/DataProvider';
import { ToastProvider } from '@/providers/gallery/ToastProvider';
import { SWProvider } from '@/providers/gallery/SWProvider';
import { ToastContainer } from '@/components/gallery/organisms/ToastContainer';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <SWProvider>
    <ToastProvider>
      <DataProvider>
        {children}
        <ToastContainer />
      </DataProvider>
    </ToastProvider>
  </SWProvider>
);
