import { Providers } from '@/providers/Providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import Header from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Banking app UI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Wallet',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  console.log('[RootLayout] render');

  return (
    <html lang="en" data-theme="wallet-light">
      <body className="bg-base-100 text-base-content h-screen overflow-hidden">
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
