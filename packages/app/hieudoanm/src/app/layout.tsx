'use client';

import '@hieudoanm.github.io/styles/globals.css';
import { DesktopSidebar } from '@hieudoanm.github.io/components/pages/start/components/sidebars/DesktopSidebar';
import {
  SidebarProvider,
  useSidebar,
} from '@hieudoanm.github.io/components/layouts/SidebarProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Be_Vietnam_Pro } from 'next/font/google';
import { FC, ReactNode, useState } from 'react';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});

const LayoutContent: FC<{ children: ReactNode }> = ({ children = <></> }) => {
  const { toolSections } = useSidebar();

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <div className="hidden h-screen overflow-hidden lg:flex">
        <DesktopSidebar toolSections={toolSections} />
        <main className="border-base-200 flex flex-1 flex-col overflow-y-auto border-l">
          {children}
        </main>
      </div>
      <div className="flex min-h-screen flex-col lg:hidden">{children}</div>
    </div>
  );
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

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
