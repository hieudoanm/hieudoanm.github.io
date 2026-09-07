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
