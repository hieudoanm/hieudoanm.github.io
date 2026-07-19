import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Next.js boilerplate',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Boilerplate',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f1729',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="dark">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
