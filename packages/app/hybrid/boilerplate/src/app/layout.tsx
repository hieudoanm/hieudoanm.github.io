import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/providers/SWProvider';
import { CookieConsentTemplate } from '@/components/templates/shared';
import { ThemeEditorLayout } from '@/layout';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Next.js boilerplate',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Boilerplate',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="nothing">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <ThemeEditorLayout>
        <SWProvider>{children}</SWProvider>
      </ThemeEditorLayout>
      <CookieConsentTemplate />
    </body>
  </html>
);

export default RootLayout;
