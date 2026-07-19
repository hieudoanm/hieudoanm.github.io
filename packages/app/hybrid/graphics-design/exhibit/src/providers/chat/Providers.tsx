'use client';

import { type FC, type ReactNode } from 'react';
import { ToastProvider } from '@/providers/chat/ToastProvider';
import { DataProvider } from '@/providers/chat/DataProvider';
import { ToastViewport } from '@/components/chat/molecules/ToastViewport';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ToastProvider>
    <DataProvider>{children}</DataProvider>
    <ToastViewport />
  </ToastProvider>
);
