import { sans } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Clipper - Clipboard Manager',
  description: 'A minimal clipboard manager for macOS',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Clipper',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="clipper" className={sans.variable}>
    <body className="h-screen overflow-hidden">{children}</body>
  </html>
);

export default RootLayout;
