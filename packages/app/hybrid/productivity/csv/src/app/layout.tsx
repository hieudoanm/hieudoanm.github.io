import { mono, sans } from '@/lib/fonts';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'CSV - Minimal Excel / Google Sheets',
  description: 'A minimal spreadsheet editor for CSV files',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CSV',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="csv-light"
    className={`${sans.variable} ${mono.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
      <RegisterServiceWorker />
    </body>
  </html>
);

export default RootLayout;
