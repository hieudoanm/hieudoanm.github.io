import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SWProvider } from '@/providers/SWProvider';

export const metadata: Metadata = {
  title: 'History',
  description: 'Timeline-based history games and tools',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'History',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('history:theme');document.documentElement.dataset.theme=t==='history-dark'?'history-dark':'history';}catch(e){document.documentElement.dataset.theme='history';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="history">
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content min-h-dvh overflow-y-auto">
      <Header />
      <SWProvider>
        <NativeProvider>
          <QueryProvider>{children}</QueryProvider>
        </NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
