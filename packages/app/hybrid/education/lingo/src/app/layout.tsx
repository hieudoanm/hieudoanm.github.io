import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { Header } from '@/components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lingo',
  description: 'Learn languages — vocabulary, dictionary and sign language',
  metadataBase: new URL('https://hieudoanm.github.io/open/lingo/'),
  openGraph: {
    type: 'website',
    siteName: 'Lingo',
    url: 'https://hieudoanm.github.io/open/lingo/',
    title: 'Learn by playing',
    description:
      'Vocabulary, economics, neuroscience, maths and engineering with calculators, visualisers and quizzes.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Lingo — Learn by playing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn by playing',
    description:
      'Vocabulary, economics, neuroscience, maths and engineering with calculators, visualisers and quizzes.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lingo',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="lingo-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <SWProvider>
        <NativeProvider>
          <QueryProvider>{children}</QueryProvider>
        </NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
