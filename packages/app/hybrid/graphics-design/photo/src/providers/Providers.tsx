'use client';

import type { FC, ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export const Providers = ({ children }: { children: ReactNode }) => (
  <DataProvider>
    <ToastProvider>{children}</ToastProvider>
  </DataProvider>
);
