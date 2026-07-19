'use client';

import { type FC, type ReactNode } from 'react';
import { DeckProvider } from '@/components/keynotes/organisms/DeckProvider';
import { ToastProvider } from '@/components/keynotes/organisms/ToastProvider';
import { ToastContainer } from '@/components/keynotes/organisms/ToastContainer';

export const Providers = ({ children }: { children: ReactNode }) => (
  <ToastProvider>
    <DeckProvider>
      {children}
      <ToastContainer />
    </DeckProvider>
  </ToastProvider>
);
