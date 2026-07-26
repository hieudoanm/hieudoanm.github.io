import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SWRegister } from '@/components/SWRegister';

export const metadata: Metadata = {
  title: 'Chat - AI Chat Interface',
  description: 'A modern AI chat interface built with Next.js',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Chat',
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
