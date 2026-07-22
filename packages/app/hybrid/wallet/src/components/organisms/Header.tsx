'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiCreditCard, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { navItems } from '@/data/nav';

const Header: FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base-200 border-base-300 sticky top-0 z-50 border-b md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <FiCreditCard /> Wallet
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Notifications">
            <FiBell />
          </Link>

          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-base-300 border-t p-4">
          <ul className="menu gap-1" role="menu">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}>
                  <item.icon />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
