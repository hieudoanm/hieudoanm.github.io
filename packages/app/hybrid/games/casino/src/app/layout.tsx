import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Casino',
  description: 'Casino',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Casino',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('casino-theme');document.documentElement.dataset.theme=t==='casino-light'?'casino-light':'casino-dark';}catch(e){document.documentElement.dataset.theme='casino-dark';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="casino-dark">
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
