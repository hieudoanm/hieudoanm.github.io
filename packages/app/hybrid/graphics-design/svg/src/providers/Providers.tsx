'use client';

import { type FC, type ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

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
