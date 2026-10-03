import { SWProvider } from '@/providers/SWProvider';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Password - Password Manager',
  description: 'A secure password manager',
  metadataBase: new URL('https://hieudoanm.github.io/open/password/'),
  openGraph: {
    type: 'website',
    siteName: 'Password',
    url: 'https://hieudoanm.github.io/open/password/',
    title: 'A password manager, local',
    description:
      'A secure password manager with a generator, a health audit and a vault you can lock and export.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Password — A password manager, local',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A password manager, local',
    description:
      'A secure password manager with a generator, a health audit and a vault you can lock and export.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Password',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="password-light">
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
