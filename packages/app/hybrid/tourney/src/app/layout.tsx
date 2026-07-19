import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Providers } from './providers';
import { SWProvider } from '@/components/SWProvider';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Tourney - Tournament Manager',
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
  themeColor: '#f97316',
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="night">
    <body className="bg-base-100 text-base-content">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
