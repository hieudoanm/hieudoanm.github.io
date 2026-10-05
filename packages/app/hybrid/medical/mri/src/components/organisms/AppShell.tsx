'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { NAV_ITEMS } from '@/content/navigation';

export const SideNav = () => {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Sections"
      className="border-base-300 bg-base-200 w-56 shrink-0 border-r">
      <ul className="menu w-full gap-0.5 p-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'menu-active' : undefined}
                title={item.description}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="bg-base-100 flex min-h-screen">
    <SideNav />
    <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
  </div>
);
