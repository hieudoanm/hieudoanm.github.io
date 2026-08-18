'use client';

import '@/styles/globals.css';
import type { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="nothing">
    <head>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </head>
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
