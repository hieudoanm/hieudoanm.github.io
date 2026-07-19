import { Header } from '@/components/organisms/Header';
import { SWProvider } from '@/providers/SWProvider';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'API Client',
  description: 'A minimal API client built with Next.js',
  metadataBase: new URL('https://hieudoanm.github.io/open/api/'),
  openGraph: {
    type: 'website',
    siteName: 'API Client',
    url: 'https://hieudoanm.github.io/open/api/',
    title: 'Debug any API in the browser',
    description:
      'REST, GraphQL, gRPC, WebSocket and MQTT in one client, with collections and saved history.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'API Client — Debug any API in the browser',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debug any API in the browser',
    description:
      'REST, GraphQL, gRPC, WebSocket and MQTT in one client, with collections and saved history.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'API Client',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="api-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content flex h-screen flex-col overflow-y-auto font-sans">
      <Header />
      <main className="flex-1">
        <SWProvider>{children}</SWProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
