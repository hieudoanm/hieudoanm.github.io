import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'SVG - Vector Editor',
  description: 'A modern vector graphics editor built with Next.js',
  manifest: '/manifest.json',
  themeColor: '#14b8a6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SVG',
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
