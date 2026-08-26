'use client';

import '@hieudoanm.github.io/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme="nothing">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-base-100 text-base-content h-screen overflow-y-auto font-[family-name:var(--font-be-vietnam-pro)] antialiased">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
