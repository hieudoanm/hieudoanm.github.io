'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bottomNavItems } from '@/data/nav';

const BottomNav: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="bg-base-200 border-base-300 fixed right-0 bottom-0 left-0 border-t md:hidden"
      aria-label="Bottom navigation">
      <ul className="menu menu-horizontal mx-auto w-full max-w-lg justify-around">
        {bottomNavItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                pathname === item.href || pathname === item.href + '/'
                  ? 'active'
                  : ''
              }
              aria-current={
                pathname === item.href || pathname === item.href + '/'
                  ? 'page'
                  : undefined
              }>
              <item.icon />
              <span className="text-xs">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
