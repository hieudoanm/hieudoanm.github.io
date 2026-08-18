'use client';

import { type FC, type ReactNode } from 'react';
import { ToastProvider } from '@/providers/ToastProvider';
import { DataProvider } from '@/providers/DataProvider';
import { ToastViewport } from '@/components/molecules/ToastViewport';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ToastProvider>
    <DataProvider>{children}</DataProvider>
    <ToastViewport />
  </ToastProvider>
);
