import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '@/components/organisms/Header';
import type { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Apps Store - Browse and download apps',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Store',
  },
  openGraph: {
    title: 'Store',
    description: 'Apps Store - Browse and download apps',
    type: 'website',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="nothing">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
