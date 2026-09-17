import { mono, sans } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Diagram - Minimal Diagram Editor',
  description: 'A minimal text-driven diagram editor',
  metadataBase: new URL('https://hieudoanm.github.io/open/diagram/'),
  openGraph: {
    type: 'website',
    siteName: 'Diagram',
    url: 'https://hieudoanm.github.io/open/diagram/',
    title: 'A diagram editor you type',
    description:
      'A minimal text-driven diagram editor: write the DSL, watch a styled SVG preview update live.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Diagram — A diagram editor you type',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A diagram editor you type',
    description:
      'A minimal text-driven diagram editor: write the DSL, watch a styled SVG preview update live.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Diagram',
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
    data-theme="diagram-light"
    className={`${sans.variable} ${mono.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
