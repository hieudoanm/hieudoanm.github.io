import type { Metadata } from 'next';
import '../styles/globals.css';
import { SWProvider } from '../components/SWProvider';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A web-based code editor',
  manifest: '/manifest.json',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Code',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="dim">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
