import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'PDF - Viewer & Editor',
  description: 'A modern PDF viewer and editor built with Next.js',
  manifest: '/manifest.json',
  themeColor: '#dc2626',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PDF',
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
