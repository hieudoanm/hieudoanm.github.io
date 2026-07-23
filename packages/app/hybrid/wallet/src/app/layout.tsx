import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/providers/Providers';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Banking app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('[RootLayout] render');
  return (
    <html lang="en" data-theme="night">
      <body className="bg-base-300 h-screen overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
