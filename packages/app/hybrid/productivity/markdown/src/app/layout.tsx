import { mono, sans, serif } from '@/lib/fonts';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="markdown-light"
    className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
