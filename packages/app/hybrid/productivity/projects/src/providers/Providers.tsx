'use client';

import type { FC, ReactNode } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export const Providers = ({ children }: { children: ReactNode }) => (
  <DataProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </DataProvider>
);
