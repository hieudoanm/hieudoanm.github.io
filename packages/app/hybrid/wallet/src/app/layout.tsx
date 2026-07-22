import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/providers/Providers';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Banking app UI',
  manifest: '/manifest.json',
  themeColor: '#1a93e0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Wallet',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('[RootLayout] render');
  return (
    <html lang="en" data-theme="night">
      <body className="bg-base-300 h-screen overflow-hidden">
        <Providers>{children}</Providers>
        <SWRegister />
      </body>
    </html>
  );
};

export default RootLayout;
