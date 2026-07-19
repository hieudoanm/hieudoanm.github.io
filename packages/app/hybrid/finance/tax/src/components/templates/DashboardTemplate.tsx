'use client';

import { usePathname } from 'next/navigation';
import { type FC, type ReactNode, useState } from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { BottomNav } from '@/components/organisms/BottomNav';

interface DashboardTemplateProps {
  children: ReactNode;
}

const getVariant = (pathname: string): 'personal' | 'business' => {
  if (pathname.startsWith('/business')) return 'business';
  return 'personal';
};

export const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const variant = getVariant(pathname);

  return (
    <div className="flex h-screen">
      <Sidebar variant={variant} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <Sidebar variant={variant} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-4 pb-20 md:p-6">
          {children}
        </main>

        <BottomNav variant={variant} />
      </div>
    </div>
  );
};
