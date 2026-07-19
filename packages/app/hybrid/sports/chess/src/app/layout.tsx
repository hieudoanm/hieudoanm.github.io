import { mono, sans } from '@/lib/fonts';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="chess-light"
    className={`${sans.variable} ${mono.variable}`}>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
