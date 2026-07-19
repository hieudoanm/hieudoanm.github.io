import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { CookieConsentTemplate } from '@/components/templates/support';
import { ThemeEditorLayout } from '@/layout';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Next.js boilerplate',
  metadataBase: new URL('https://hieudoanm.github.io/open/boilerplate/'),
  openGraph: {
    type: 'website',
    siteName: 'Boilerplate',
    url: 'https://hieudoanm.github.io/open/boilerplate/',
    title: '260+ screens, already built',
    description:
      'Next.js boilerplate covering app, CRM, developer, finance, health, mail, media, store and travel.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Boilerplate — 260+ screens, already built',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '260+ screens, already built',
    description:
      'Next.js boilerplate covering app, CRM, developer, finance, health, mail, media, store and travel.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Boilerplate',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="boilerplate-light">
    <head>
      <title>Boilerplate</title>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <ThemeEditorLayout>
        <SWProvider>{children}</SWProvider>
      </ThemeEditorLayout>
      <CookieConsentTemplate />
    </body>
  </html>
);

export default RootLayout;
