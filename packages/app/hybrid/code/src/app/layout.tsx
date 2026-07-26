import type { Metadata } from 'next';
import '../styles/globals.css';
import { SWRegister } from '../components/SWRegister';

export const metadata: Metadata = {
  title: 'Code Editor',
  description: 'A web-based code editor',
  manifest: '/manifest.json',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Code',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="dim">
    <body className="bg-base-100 text-base-content h-screen overflow-hidden">
      {children}
      <SWRegister />
    </body>
  </html>
);

export default RootLayout;
