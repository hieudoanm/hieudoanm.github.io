import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { Providers } from '@/providers/Providers';
import { PwaRegister } from '@/components/PwaRegister';
import { SkipLink } from '@/components/atoms/SkipLink';

const BASE_PATH = process.env.BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'Keynotes — Presentation editor',
  description:
    'A PowerPoint / Google Slides / Apple Keynote inspired presentation editor.',
  manifest: `${BASE_PATH}/manifest.webmanifest`,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0b1020',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="night">
      <body className="h-full">
        <SkipLink />
        <PwaRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
