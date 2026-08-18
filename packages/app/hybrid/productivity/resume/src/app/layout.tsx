import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import { SWProvider } from '../providers/SWProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Resume - Free Resume Builder',
  description:
    'A free resume builder with 32 templates, live preview and PDF export.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Resume',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="paper">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body className="bg-base-200 text-base-content min-h-screen font-mono">
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
