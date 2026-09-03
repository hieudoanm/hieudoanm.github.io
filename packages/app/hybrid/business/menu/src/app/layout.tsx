import type { Metadata } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import Header from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Create restaurant menus and share them with a QR code',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Menu',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="dim">
    <body className="bg-base-100 text-base-content flex min-h-screen flex-col overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;