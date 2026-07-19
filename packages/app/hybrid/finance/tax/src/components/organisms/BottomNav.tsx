'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';
import { personalBottomNavItems, businessBottomNavItems } from '@/data/nav';

interface BottomNavProps {
  variant?: 'personal' | 'business';
}

export const BottomNav: FC<BottomNavProps> = ({ variant = 'personal' }) => {
  const pathname = usePathname();
  const items =
    variant === 'business' ? businessBottomNavItems : personalBottomNavItems;

  return (
    <nav className="bg-base-200 border-base-300 safe-bottom fixed right-0 bottom-0 left-0 z-40 border-t md:hidden">
      <ul className="flex list-none items-center justify-around py-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/personal' &&
              item.href !== '/business' &&
              pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] transition-colors ${
                  isActive ? 'text-primary font-medium' : 'text-base-content/50'
                }`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
