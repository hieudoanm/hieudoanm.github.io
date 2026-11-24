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
  description: 'Hieu Doan — resume and portfolio',
  metadataBase: new URL('https://hieudoanm.github.io/open/docs/'),
  openGraph: {
    type: 'website',
    siteName: 'Hieu Doan',
    url: 'https://hieudoanm.github.io/open/docs/',
    title: 'Hieu Doan',
    description: 'Hieu Doan — resume and app store',
    images: [
      {
        url: '/og/og.png',
        width: 1280,
        height: 640,
        alt: 'Hieu Doan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hieu Doan',
    description: 'Hieu Doan — resume and app store',
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
    <html lang="en" data-theme="hieudoanm">
      <body className={beVietnamPro.className + ' antialiased'}>
        <RootLayoutClient>
          <div
            id="store-root"
            className="bg-base-100 text-base-content flex w-full flex-1 flex-col font-mono">
            <div className="flex-1">{children}</div>
          </div>
        </RootLayoutClient>
      </body>
    </html>
  );
};

export default RootLayout;
