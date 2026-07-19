import { SWProvider } from '@/components/SWProvider';
import { mono, sans, serif } from '@/lib/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Markdown - Minimal Obsidian',
  description: 'A minimal Obsidian-like notes vault with a Markdown editor',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Markdown',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="night"
    className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body
      className="bg-base-100 text-base-content h-screen overflow-y-auto"
      style={{ fontFamily: 'var(--font-mono)' }}>
      <SWProvider>{children}</SWProvider>
    </body>
  </html>
);

export default RootLayout;
