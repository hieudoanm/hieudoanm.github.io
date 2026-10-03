import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { NativeProvider } from '@/providers/NativeProvider';
import { Header } from '@/components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Brainbow',
  description: 'Brainbow microscopy image viewer and annotator',
  metadataBase: new URL('https://hieudoanm.github.io/open/brainbow/'),
  openGraph: {
    type: 'website',
    siteName: 'Brainbow',
    url: 'https://hieudoanm.github.io/open/brainbow/',
    title: 'Microscopy, annotated in place',
    description:
      'A microscopy image viewer and annotator for multi-channel rasters, z-stacks and large images.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Brainbow — Microscopy, annotated in place',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microscopy, annotated in place',
    description:
      'A microscopy image viewer and annotator for multi-channel rasters, z-stacks and large images.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Brainbow',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="brainbow-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <SWProvider>
        <NativeProvider>{children}</NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
