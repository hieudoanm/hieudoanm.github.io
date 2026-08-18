import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SWProvider } from '@/providers/SWProvider';

export const metadata: Metadata = {
  title: 'Economics',
  description: 'Game theory and economics simulations',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Economics',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('economics:theme');document.documentElement.dataset.theme=t==='economics-dark'?'economics-dark':'economics';}catch(e){document.documentElement.dataset.theme='economics';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="economics">
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
