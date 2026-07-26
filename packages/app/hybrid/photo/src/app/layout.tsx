import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Photo - Image Editor',
  description: 'A powerful image editor',
  manifest: '/manifest.json',
  themeColor: '#ec4899',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Photo',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="night">
    <body className="bg-base-100 text-base-content">
      {children}
      <SWRegister />
    </body>
  </html>
);

export default RootLayout;
