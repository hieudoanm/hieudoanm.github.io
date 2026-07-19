import { Providers } from '@/providers/Providers';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Tax',
  description: 'Vietnamese tax management app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tax',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  console.log('[RootLayout] render');

  return (
    <html lang="vi" data-theme="tax-dark">
      <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
