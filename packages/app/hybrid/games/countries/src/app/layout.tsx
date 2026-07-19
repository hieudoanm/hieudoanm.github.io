import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

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

const THEME_INIT = `(function(){try{var t=localStorage.getItem('countries-theme');document.documentElement.dataset.theme=t==='countries-light'?'countries-light':'countries-dark';}catch(e){document.documentElement.dataset.theme='countries-dark';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="countries-dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
