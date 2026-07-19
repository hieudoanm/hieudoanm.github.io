'use client';

import { type FC, type ReactNode } from 'react';
import { DataProvider } from '@/providers/ai/DataProvider';
import { ToastProvider } from '@/providers/ai/ToastProvider';
import { ToastContainer } from '@/components/ai/organisms/ToastContainer';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <ToastProvider>
    <DataProvider>
      {children}
      <ToastContainer />
    </DataProvider>
  </ToastProvider>
);
