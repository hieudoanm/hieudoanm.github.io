import { mono, sans, serif } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';

export const metadata: Metadata = {
  title: 'Office - Productivity',
  description: 'A suite of productivity tools for planning your work',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Office',
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
    data-theme="office-light"
    className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-hidden font-mono">
      <RegisterServiceWorker />
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </body>
  </html>
);

export default RootLayout;
