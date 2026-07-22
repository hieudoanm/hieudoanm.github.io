'use client';

import { type ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

export const Providers = ({ children }: { children: ReactNode }) => (
  <ToastProvider>
    <DataProvider>
      {children}
      <ToastContainer />
    </DataProvider>
  </ToastProvider>
);
