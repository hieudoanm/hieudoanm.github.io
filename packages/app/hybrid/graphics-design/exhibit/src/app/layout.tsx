import { Header } from '@/components/shared/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Exibit - UI Exhibition',
  description: 'Showcase of UI Applications',
  metadataBase: new URL('https://hieudoanm.github.io/open/exhibit/'),
  openGraph: {
    type: 'website',
    siteName: 'Exhibit',
    url: 'https://hieudoanm.github.io/open/exhibit/',
    title: 'A UI component showcase',
    description:
      'A showcase of UI applications: a full banking wallet, a point of sale, a chat and a menu builder.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Exhibit — A UI component showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A UI component showcase',
    description:
      'A showcase of UI applications: a full banking wallet, a point of sale, a chat and a menu builder.',
    images: ['/og/og.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Exibit',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="exibit-light">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <main className="flex-1">{children}</main>
    </body>
  </html>
);

export default RootLayout;
