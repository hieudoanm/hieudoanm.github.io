import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Tourney - Tournaments Manager',
  description: 'Create and manage tournaments across multiple formats',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tourney',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="nothing">
    <body className="bg-base-100 text-base-content">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
