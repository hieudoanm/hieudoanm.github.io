'use client';

import { type ReactNode } from 'react';
import { DataProvider } from '@/providers/password/DataProvider';
import { ToastProvider } from '@/providers/password/ToastProvider';
import { SecurityProvider } from '@/providers/password/SecurityProvider';
import { SWProvider } from '@/providers/password/SWProvider';
import { ToastContainer } from '@/components/password/organisms/ToastContainer';

export const Providers = ({ children }: { children: ReactNode }) => (
  <SWProvider>
    <ToastProvider>
      <DataProvider>
        <SecurityProvider>
          {children}
          <ToastContainer />
        </SecurityProvider>
      </DataProvider>
    </ToastProvider>
  </SWProvider>
);
