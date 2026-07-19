'use client';

import { type FC, type ReactNode } from 'react';
import { DeckProvider } from '@/providers/DeckProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';

export const Providers = ({ children }: { children: ReactNode }) => (
  <ToastProvider>
    <DeckProvider>
      {children}
      <ToastContainer />
    </DeckProvider>
  </ToastProvider>
);
