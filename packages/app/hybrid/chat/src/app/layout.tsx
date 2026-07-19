import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWProvider } from '@/components/SWProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chat - AI Chat Interface',
  description: 'A modern AI chat interface built with Next.js',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chat',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="night">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
