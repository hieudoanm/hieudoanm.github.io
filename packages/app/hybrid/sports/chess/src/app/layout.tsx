import { mono, sans } from '@/lib/fonts';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chess - Chess Tools',
  description: 'A minimal chess toolbox',
  metadataBase: new URL('https://hieudoanm.github.io/open/chess/'),
  openGraph: {
    type: 'website',
    siteName: 'Chess',
    url: 'https://hieudoanm.github.io/open/chess/',
    title: 'Board, clock and analysis',
    description:
      'A minimal chess toolbox: play on a board, run a clock, track Elo, review games and study openings.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Chess — Board, clock and analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Board, clock and analysis',
    description:
      'A minimal chess toolbox: play on a board, run a clock, track Elo, review games and study openings.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chess',
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
    data-theme="chess-light"
    className={`${sans.variable} ${mono.variable}`}>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
