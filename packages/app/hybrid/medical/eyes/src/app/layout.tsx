import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';
import { SWProvider } from '@/providers/SWProvider';
import { NativeProvider } from '@/providers/NativeProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Eyes',
  description: 'Visual acuity charts for vision screening',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Eyes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="luxury">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header title="Eyes" />
      <SWProvider>
        <NativeProvider>{children}</NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
