'use client';

import { type FC, type ReactNode } from 'react';
import { ToastProvider } from '@/providers/messaging/ToastProvider';
import { DataProvider } from '@/providers/messaging/DataProvider';
import { ToastViewport } from '@/components/messaging/molecules/ToastViewport';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ToastProvider>
    <DataProvider>{children}</DataProvider>
    <ToastViewport />
  </ToastProvider>
);
