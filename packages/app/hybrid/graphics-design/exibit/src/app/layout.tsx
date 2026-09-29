import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Exibit - UI Exhibition',
  description: 'Showcase of UI Applications',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Exibit',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="exibit-light">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
