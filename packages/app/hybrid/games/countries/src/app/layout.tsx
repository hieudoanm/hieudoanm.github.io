import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Countries',
  description: 'Countries - The New York Times Variant',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Countries',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('countries-theme');document.documentElement.dataset.theme=t==='countries-dark'?'countries-dark':'countries-light';}catch(e){document.documentElement.dataset.theme='countries-light';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="countries-light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-base-100 text-base-content flex h-screen min-h-screen flex-col overflow-y-auto font-mono">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
