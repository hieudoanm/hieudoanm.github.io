import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { NativeProvider } from '@/providers/NativeProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Psychology',
  description: 'Validated psychological self-report scales',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Psychology',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="nothing">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>
        <NativeProvider>{children}</NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
