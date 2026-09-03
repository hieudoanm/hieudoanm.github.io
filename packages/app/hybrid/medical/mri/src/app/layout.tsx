import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'MRI',
  description: 'MRI research workspace and orchestration layer',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MRI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="mri-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
