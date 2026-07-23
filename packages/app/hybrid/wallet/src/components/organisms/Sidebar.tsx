'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiCreditCard, FiUser } from 'react-icons/fi';
import { navItems } from '@/data/nav';
import { useData } from '@/providers/DataProvider';

const Sidebar: FC = () => {
  const pathname = usePathname();
  const { user } = useData();

  return (
    <aside className="bg-base-200 border-base-300 hidden h-screen w-64 flex-col border-r md:flex">
      <div className="border-base-300 border-b p-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <FiCreditCard /> Wallet
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4" aria-label="Sidebar">
        <ul className="menu gap-1">
          {navItems.map((item) => (
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
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-base-300 border-t p-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content flex h-10 w-10 items-center justify-center rounded-full">
              <FiUser />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name ?? 'Guest'}</p>
            <p className="text-base-content/60 text-xs">{user?.email ?? ''}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
