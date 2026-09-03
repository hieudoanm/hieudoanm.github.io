import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { NativeProvider } from '@/providers/NativeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SWProvider } from '@/providers/SWProvider';

export const metadata: Metadata = {
  title: 'Foody',
  description: 'Spin the reel and let fate pick your next meal',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Foody',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('foody:theme');document.documentElement.dataset.theme=t==='foody-dark'?'foody-dark':'foody-light';}catch(e){document.documentElement.dataset.theme='foody-light';}})();`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="foody-light">
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content min-h-dvh overflow-y-auto">
      <SWProvider>
        <NativeProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </NativeProvider>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
