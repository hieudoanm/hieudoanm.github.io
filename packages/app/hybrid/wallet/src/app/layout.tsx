import { Providers } from '@/providers/Providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Banking app UI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Wallet',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  console.log('[RootLayout] render');

  return (
    <html lang="en" data-theme="night">
      <body className="bg-base-100 text-base-content h-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
