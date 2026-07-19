import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: '8-Bit Games',
  description: '8-bit classic games: Maze, Snake, DinoRun',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '8-Bit Games',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('8-bit-theme');document.documentElement.dataset.theme=t==='8-bit-light'?'8-bit-light':'8-bit-dark';}catch(e){document.documentElement.dataset.theme='8-bit-dark';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="8-bit-dark">
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

export default RootLayout;
