import { mono, sans } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="diagram-light"
    className={`${sans.variable} ${mono.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
