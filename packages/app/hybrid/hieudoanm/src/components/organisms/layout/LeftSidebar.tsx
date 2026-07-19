'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';
import {
  PiBooks,
  PiGameController,
  PiGear,
  PiHouse,
  PiInfo,
  PiPackage,
  PiSquaresFour,
} from 'react-icons/pi';

const LINKS: {
  href: string;
  label: string;
  icon: FC<{ className?: string; size?: number }>;
}[] = [
  { href: '/', label: 'Home', icon: PiHouse },
  { href: '/apps', label: 'Apps', icon: PiSquaresFour },
  { href: '/games', label: 'Games', icon: PiGameController },
  { href: '/downloads', label: 'Downloads', icon: PiPackage },
  { href: '/md', label: 'Markdown', icon: PiBooks },
  { href: '/settings', label: 'Settings', icon: PiGear },
  { href: '/version', label: 'Version', icon: PiInfo },
];

export const LeftSidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="bg-base-200 flex w-12 flex-col items-center gap-2 py-2">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active =
          href === '/'
            ? pathname === '/'
            : pathname !== null &&
              (pathname === href || pathname.startsWith(`${href}/`));

        return (
          <Link
            key={href}
            href={href}
            title={label}
            aria-current={active ? 'page' : undefined}
            className={`btn btn-ghost btn-square btn-sm ${
              active ? 'bg-primary/20 text-primary' : 'text-base-content/60'
            }`}>
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
};

LeftSidebar.displayName = 'LeftSidebar';
