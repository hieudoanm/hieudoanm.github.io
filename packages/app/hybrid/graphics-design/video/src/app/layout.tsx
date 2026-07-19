import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import { Header } from '@/components/organisms/Header';

export const metadata: Metadata = {
  title: 'Video Tools',
  description: 'Browser-based video and audio processing tools',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="video-light">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      {children}
    </body>
  </html>
);

export default RootLayout;
