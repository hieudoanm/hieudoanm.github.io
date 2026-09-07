'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export interface Crumb {
  href: string;
  label: string;
}

const CRUMB_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/downloads': 'Downloads',
  '/version': 'Version',
  '/guess': 'Guess',
  '/nyt': 'NYT',
  '/nyt/connections': 'Connections',
  '/nyt/wordle': 'Wordle',
  '/sort': 'Sort',
  '/sort/continents': 'Continents Sort',
  '/higher-or-lower': 'Higher or Lower',
  '/sign-in': 'Sign In',
  '/sign-up': 'Sign Up',
  '/forget-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/profile': 'Profile',
};

const humanize = (segment: string): string =>
  segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const buildBreadcrumbs = (pathname: string): Crumb[] => {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ href: '/', label: CRUMB_LABELS['/'] }];
  let href = '';
  for (const segment of segments) {
    href += `/${segment}`;
    crumbs.push({ href, label: CRUMB_LABELS[href] ?? humanize(segment) });
  }
  return crumbs;
};

export const Footer: FC = () => {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);

  return (
    <footer className="border-base-300 bg-base-100 w-full border-t px-4 py-3 sm:px-6">
      <div className="breadcrumbs text-xs">
        <ul>
          {crumbs.map((crumb, index) => {
            const isCurrent = index === crumbs.length - 1;
            return (
              <li key={crumb.href}>
                {isCurrent ? (
                  <span className="text-base-content/60">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
