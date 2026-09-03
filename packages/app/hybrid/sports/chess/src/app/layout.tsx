import { mono, sans } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chess - Chess Tools',
  description: 'A minimal chess toolbox',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chess',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="chess-light"
    className={`${sans.variable} ${mono.variable}`}>
    <body className="h-screen overflow-hidden">{children}</body>
  </html>
);

export default RootLayout;
