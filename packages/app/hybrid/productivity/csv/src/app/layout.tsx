import { mono, sans } from '@/lib/fonts';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';
import '@/styles/globals.css';
import type { Metadata } from 'next';
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

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="csv-light"
    className={`${sans.variable} ${mono.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </head>
    <body className="h-screen overflow-hidden">
      {children}
      <RegisterServiceWorker />
    </body>
  </html>
);

export default RootLayout;
