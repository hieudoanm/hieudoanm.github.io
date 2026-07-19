import RootLayoutClient from '@hieudoanm.github.io/components/layout/RootLayoutClient';
import '@hieudoanm.github.io/styles/globals.css';
import { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { FC, ReactNode } from 'react';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
  title: 'Hieu Doan',
  description: 'Start Page',
  metadataBase: new URL('https://hieudoanm.github.io/open/docs/'),
  openGraph: {
    type: 'website',
    siteName: 'Hieu Doan',
    url: 'https://hieudoanm.github.io/open/docs/',
    title: 'A start page that works',
    description:
      'A start page with a calculator, clocks, data converters, developer utilities and a writing space.',
    images: [
      {
        url: '/og/og.png',
        width: 1200,
        height: 630,
        alt: 'Hieu Doan — A start page that works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A start page that works',
    description:
      'A start page with a calculator, clocks, data converters, developer utilities and a writing space.',
    images: ['/og/og.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hieu Doan',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="nothing">
      <body className={beVietnamPro.className + ' antialiased'}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
};

export default RootLayout;
