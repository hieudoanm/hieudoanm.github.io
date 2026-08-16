import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/providers/Providers';
import { SWProvider } from '@/components/SWProvider';
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
  themeColor: '#151516',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="nothing">
      <body>
        <SWProvider>
          <Providers>{children}</Providers>
        </SWProvider>
      </body>
    </html>
  );
}
