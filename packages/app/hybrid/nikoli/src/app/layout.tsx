'use client';

import '@/styles/globals.css';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { Header } from '@/components/organisms/Header';

const STORAGE_KEY = 'nikoli-theme';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dracula';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  return (
    <html lang="en" data-theme="dracula">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
