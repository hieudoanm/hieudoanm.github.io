import { mono, sans } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Diagram - Minimal Diagram Editor',
  description: 'A minimal text-driven diagram editor',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Diagram',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="diagram"
    className={`${sans.variable} ${mono.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="h-screen overflow-hidden">{children}</body>
  </html>
);

export default RootLayout;
