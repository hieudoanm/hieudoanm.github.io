import { Header } from '@/components/organisms/Header';
import { SWProvider } from '@/providers/SWProvider';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'API Client',
  description: 'A minimal API client built with Next.js',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'API Client',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="api-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">
        <SWProvider>{children}</SWProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
