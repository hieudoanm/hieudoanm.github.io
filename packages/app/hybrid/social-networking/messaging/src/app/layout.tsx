import type { Metadata, Viewport } from 'next';
import { type FC, type ReactNode } from 'react';
import { Providers } from '@/providers/Providers';
import { SWProvider } from '@/providers/SWProvider';
import { Header } from '@/components/organisms/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Messaging',
    template: '%s — Messaging',
  },
  description:
    'A messaging app inspired by Telegram, WhatsApp, Messenger and Signal with end-to-end style privacy, groups and rich messages.',
  keywords: [
    'messaging',
    'chat',
    'telegram',
    'whatsapp',
    'messenger',
    'signal',
  ],
  applicationName: 'Messaging',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#151516',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="messaging-light">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <Header />
      <SWProvider>
        <Providers>{children}</Providers>
      </SWProvider>
    </body>
  </html>
);

export default RootLayout;
