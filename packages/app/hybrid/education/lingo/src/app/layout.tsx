import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lingo',
  description: 'Learn languages — flashcards, dictionary and sign language',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lingo',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('lingo:theme');document.documentElement.dataset.theme=t==='lingo-dark'?'lingo-dark':'lingo-light';}catch(e){document.documentElement.dataset.theme='lingo-light';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="lingo-light">
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content min-h-dvh overflow-y-auto">
      <SWProvider>
        <NativeProvider>
          <QueryProvider>{children}</QueryProvider>
        </NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
