import '@/styles/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { FiClock, FiDownload, FiInfo } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Football Manager',
  description: 'Pick a formation, assign your squad, and manage your team',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Football Manager',
  },
};

const NAV_ITEMS = [
  { label: 'About', href: '/about', icon: <FiInfo className="h-3.5 w-3.5" /> },
  {
    label: 'Downloads',
    href: '/downloads',
    icon: <FiDownload className="h-3.5 w-3.5" />,
  },
  {
    label: 'Version',
    href: '/version',
    icon: <FiClock className="h-3.5 w-3.5" />,
  },
];

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="football-light">
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    </head>
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <div className="flex h-full flex-col">
        <header className="border-base-300 flex items-center justify-between gap-4 border-b px-4 py-2 print:hidden">
          <Link href="/">
            <h1 className="text-sm font-bold">Football</h1>
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="btn btn-ghost btn-xs gap-1.5">
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
