import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '@/components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PDF - Viewer & Editor',
  description: 'A modern PDF viewer and editor built with Next.js',
  metadataBase: new URL('https://hieudoanm.github.io/open/pdf/'),
  openGraph: {
    type: 'website',
    siteName: 'PDF',
    url: 'https://hieudoanm.github.io/open/pdf/',
    title: 'A PDF viewer and editor',
    description:
      'A modern PDF viewer and editor: annotate, merge and compare files, with a toolbox of page tools.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'PDF — A PDF viewer and editor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A PDF viewer and editor',
    description:
      'A modern PDF viewer and editor: annotate, merge and compare files, with a toolbox of page tools.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PDF',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="pdf-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
