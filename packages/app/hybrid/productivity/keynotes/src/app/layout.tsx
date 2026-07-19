import type { Metadata, Viewport } from 'next';
import { type FC, type ReactNode } from 'react';
import '@/styles/globals.css';
import { Providers } from '@/providers/Providers';
import { PwaRegister } from '@/components/PwaRegister';
import { SkipLink } from '@/components/atoms/SkipLink';
import { Header } from '@/components/organisms/Header';

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

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en" data-theme="night">
    <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-mono">
      <SkipLink />
      <PwaRegister />
      <Header />
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
