import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Providers } from './providers';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Tourney - Tournament Manager',
  description: 'Create and manage tournaments across multiple formats',
  manifest: '/manifest.json',
  themeColor: '#f97316',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tourney',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body className="bg-base-100 text-base-content">
      <Providers>{children}</Providers>
      <SWRegister />
    </body>
  </html>
);

export default RootLayout;
