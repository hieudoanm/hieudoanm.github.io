import { Header } from '@/components/organisms/Header';
import { SWProvider } from '@/providers/SWProvider';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Colors',
  description: 'A collection of practical color tools',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Colors',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('colors:theme');document.documentElement.dataset.theme=t==='colors-light'?'colors-light':'colors-dark';}catch(e){document.documentElement.dataset.theme='colors-dark';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="colors-dark">
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>
        <Header />
        {children}
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
