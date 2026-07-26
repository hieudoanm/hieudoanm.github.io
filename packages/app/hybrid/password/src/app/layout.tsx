import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Password - Password Manager',
  description: 'A secure password manager',
  manifest: '/manifest.json',
  themeColor: '#ef4444',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Password',
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
