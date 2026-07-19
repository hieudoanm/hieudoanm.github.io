import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '../components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A web-based code editor',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="code-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
