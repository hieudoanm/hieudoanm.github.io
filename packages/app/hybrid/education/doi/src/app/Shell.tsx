'use client';

import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { DoiProvider } from '@/providers/DoiProvider';

const Shell: FC<{ children: ReactNode }> = ({ children }) => (
  <DoiProvider>
    <Header />
    {children}
  </DoiProvider>
);

export default Shell;
