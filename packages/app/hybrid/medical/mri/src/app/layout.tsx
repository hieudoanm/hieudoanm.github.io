import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'MRI',
  description: 'MRI research workspace and orchestration layer',
  metadataBase: new URL('https://hieudoanm.github.io/open/mri/'),
  openGraph: {
    type: 'website',
    siteName: 'MRI',
    url: 'https://hieudoanm.github.io/open/mri/',
    title: 'An MRI research workspace',
    description:
      'MRI research workspace and orchestration layer: studies, protocols, pipelines, models and a viewer.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'MRI — An MRI research workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'An MRI research workspace',
    description:
      'MRI research workspace and orchestration layer: studies, protocols, pipelines, models and a viewer.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MRI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="mri-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
