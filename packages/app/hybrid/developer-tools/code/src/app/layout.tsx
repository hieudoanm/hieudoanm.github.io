import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '../components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A web-based code editor',
  metadataBase: new URL('https://hieudoanm.github.io/open/code/'),
  openGraph: {
    type: 'website',
    siteName: 'Code Editor',
    url: 'https://hieudoanm.github.io/open/code/',
    title: 'A code editor in the tab',
    description:
      'A web-based code editor with highlighting for JavaScript, TypeScript, Python, Rust and more.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Code Editor — A code editor in the tab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A code editor in the tab',
    description:
      'A web-based code editor with highlighting for JavaScript, TypeScript, Python, Rust and more.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="code-light">
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
