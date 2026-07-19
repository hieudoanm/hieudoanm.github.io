'use client';

import { Breadcrumb } from '@hieudoanm.github.io/components/organisms/layout/Breadcrumb';
import { LeftSidebar } from '@hieudoanm.github.io/components/organisms/layout/LeftSidebar';
import { RightSidebar } from '@hieudoanm.github.io/components/organisms/layout/RightSidebar';
import { SidebarProvider } from '@hieudoanm.github.io/components/organisms/layout/SidebarProvider';
import { useSWRegister } from '@hieudoanm.github.io/hooks/useSWRegister';
import '@hieudoanm.github.io/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Be_Vietnam_Pro } from 'next/font/google';
import { FC, ReactNode, useState } from 'react';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});

const LayoutContent: FC<{ children: ReactNode }> = ({ children = <></> }) => {
  return (
    <div className="bg-base-100 text-base-content flex h-screen w-screen overflow-hidden">
      <LeftSidebar />
      <main className="border-base-300 flex h-screen flex-1 flex-col border-r border-l">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <Breadcrumb />
      </main>
      <RightSidebar />
    </div>
  );
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  useSWRegister();

  return (
    <html lang="en" data-theme="nothing">
      <body className={beVietnamPro.className + ' antialiased'}>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <LayoutContent>{children}</LayoutContent>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
