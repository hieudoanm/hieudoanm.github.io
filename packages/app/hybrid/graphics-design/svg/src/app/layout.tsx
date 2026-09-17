import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '@/components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SVG - Vector Editor',
  description: 'A modern vector graphics editor built with Next.js',
  metadataBase: new URL('https://hieudoanm.github.io/open/svg/'),
  openGraph: {
    type: 'website',
    siteName: 'SVG',
    url: 'https://hieudoanm.github.io/open/svg/',
    title: 'Draw vectors, read the source',
    description:
      'A modern vector graphics editor: shape tools on a canvas with the SVG source open beside it.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'SVG — Draw vectors, read the source',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Draw vectors, read the source',
    description:
      'A modern vector graphics editor: shape tools on a canvas with the SVG source open beside it.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SVG',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="svg-light">
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
