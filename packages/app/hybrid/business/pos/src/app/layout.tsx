import type { Metadata } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'POS',
  description: 'Minimal point of sale client built with Next.js',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'POS',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="dim">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
