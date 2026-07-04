'use client';

import '@hieudoanm.github.io/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ReactNode, useState } from 'react';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme="nothing">
      <body className={beVietnamPro.className + ' antialiased'}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
