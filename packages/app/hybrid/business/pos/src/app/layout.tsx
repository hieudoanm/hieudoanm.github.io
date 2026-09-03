import type { Metadata } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'POS',
  description: 'Minimal point of sale client built with Next.js',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'POS',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="pos-dark">
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
