import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Video Tools',
  description: 'Browser-based video and audio processing tools',
  metadataBase: new URL('https://hieudoanm.github.io/open/video/'),
  openGraph: {
    type: 'website',
    siteName: 'Video',
    url: 'https://hieudoanm.github.io/open/video/',
    title: 'Video and audio, converted',
    description:
      'Browser-based video and audio processing: convert between formats, edit and extract audio locally.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Video — Video and audio, converted',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video and audio, converted',
    description:
      'Browser-based video and audio processing: convert between formats, edit and extract audio locally.',
    images: ['/og/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="video-light">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
