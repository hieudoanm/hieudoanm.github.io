import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SWProvider } from '@/providers/SWProvider';

export const metadata: Metadata = {
  title: 'Foody',
  description: 'Spin the reel and let fate pick your next meal',
  metadataBase: new URL('https://hieudoanm.github.io/open/foody/'),
  openGraph: {
    type: 'website',
    siteName: 'Foody',
    url: 'https://hieudoanm.github.io/open/foody/',
    title: 'Spin the wheel, eat better',
    description:
      'Spin the reel and let fate pick your next meal, with a weekly schedule and a reusable dish list.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Foody — Spin the wheel, eat better',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spin the wheel, eat better',
    description:
      'Spin the reel and let fate pick your next meal, with a weekly schedule and a reusable dish list.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Foody',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="foody-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>
        <NativeProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
