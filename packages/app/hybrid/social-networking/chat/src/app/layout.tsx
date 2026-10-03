import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';
import { SWProvider } from '@/providers/SWProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chat - AI Chat Interface',
  description: 'A modern AI chat interface built with Next.js',
  metadataBase: new URL('https://hieudoanm.github.io/open/chat/'),
  openGraph: {
    type: 'website',
    siteName: 'Chat',
    url: 'https://hieudoanm.github.io/open/chat/',
    title: 'An AI chat you control',
    description:
      'A modern AI chat interface with streaming replies, model switching and system prompt templates.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Chat — An AI chat you control',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'An AI chat you control',
    description:
      'A modern AI chat interface with streaming replies, model switching and system prompt templates.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chat',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="chat-light">
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
