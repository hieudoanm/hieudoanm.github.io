'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

interface NavbarItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface NavbarProps {
  items: NavbarItem[];
  position?: 'bottom' | 'top';
}

export const Navbar: FC<NavbarProps> = ({ items, position = 'bottom' }) => {
  const pathname = usePathname();

  const positionClass =
    position === 'bottom' ? 'fixed bottom-0 border-t' : 'fixed top-0 border-b';

  return (
    <nav
      className={`border-base-300 bg-base-100 ${positionClass} flex w-full justify-around py-3`}>
      {items.map((item) => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`}>
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
