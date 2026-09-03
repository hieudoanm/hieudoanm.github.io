import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/components/SWProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PDF - Viewer & Editor',
  description: 'A modern PDF viewer and editor built with Next.js',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PDF',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="pdf-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
