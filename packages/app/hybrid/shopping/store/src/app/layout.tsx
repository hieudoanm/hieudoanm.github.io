import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';
import type { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Apps Store - Browse and download apps',
  metadataBase: new URL('https://hieudoanm.github.io/open/store/'),
  openGraph: {
    type: 'website',
    siteName: 'Store',
    url: 'https://hieudoanm.github.io/open/store/',
    title: 'Browse and download apps',
    description:
      'Browse the collection and download each app for the web, desktop or mobile.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Store — Browse and download apps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse and download apps',
    description:
      'Browse the collection and download each app for the web, desktop or mobile.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Store',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="store-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
