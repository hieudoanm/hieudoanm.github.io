import type { Metadata } from 'next';
import '@/styles/globals.css';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Football Squad Manager',
  description: 'Pick a formation, assign your squad, and manage your team',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Football Squad Manager',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="dim">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      {children}
    </body>
  </html>
);

export default RootLayout;
