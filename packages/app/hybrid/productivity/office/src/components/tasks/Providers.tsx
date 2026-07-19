'use client';

import type { FC, ReactNode } from 'react';
import { DataProvider } from '@/lib/tasks/data-provider';
import { AuthProvider } from '@/lib/tasks/auth';
import { ToastProvider } from '@/lib/tasks/toast';

export const TasksProviders = ({ children }: { children: ReactNode }) => (
  <DataProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </DataProvider>
);
