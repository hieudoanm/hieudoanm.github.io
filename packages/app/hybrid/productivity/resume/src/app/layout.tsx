import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '../components/organisms/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Resume - Free Resume Builder',
  description:
    'A free resume builder with 64 templates, live preview and PDF export.',
  metadataBase: new URL('https://hieudoanm.github.io/open/resume/'),
  openGraph: {
    type: 'website',
    siteName: 'Resume',
    url: 'https://hieudoanm.github.io/open/resume/',
    title: 'A resume builder that exports',
    description:
      'A free resume builder with 64 templates, live preview and PDF export.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Resume — A resume builder that exports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A resume builder that exports',
    description:
      'A free resume builder with 64 templates, live preview and PDF export.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Resume',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="resume-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content overflow-y-auto font-mono">
      <Header />
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
