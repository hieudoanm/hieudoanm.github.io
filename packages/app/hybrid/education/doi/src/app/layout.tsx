import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import Shell from '@/providers/Shell';

export const metadata: Metadata = {
  title: 'DOI - Citation Graph',
  description: 'Explore the Crossref citation network interactively',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DOI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="doi-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Shell>{children}</Shell>
    </body>
  </html>
);

export default RootLayout;
