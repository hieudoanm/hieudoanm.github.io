'use client';

import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import {
  FiAlertCircle,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiClock as FiClock2,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiInfo,
  FiKey,
  FiLogIn,
  FiSearch,
  FiSettings,
  FiShield,
  FiShieldOff,
  FiShoppingBag,
  FiShoppingCart,
  FiTerminal,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi';

interface PageEntry {
  label: string;
  href: string;
  icon: ReactNode;
  description?: string;
}

const GROUPS: { title: string; pages: PageEntry[] }[] = [
  {
    title: 'Main',
    pages: [
      {
        label: 'Home',
        href: '/',
        icon: <FiGrid />,
        description: 'Current page — theme editor & site directory',
      },
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <FiGrid />,
        description: 'Overview dashboard',
      },
      {
        label: 'Profile',
        href: '/profile',
        icon: <FiUser />,
        description: 'User profile',
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: <FiSettings />,
        description: 'App settings & theme picker',
      },
      {
        label: 'Version',
        href: '/version',
        icon: <FiClock />,
        description: 'Build version info',
      },
      {
        label: 'Search',
        href: '/search',
        icon: <FiSearch />,
        description: 'Search page',
      },
    ],
  },
  {
    title: 'Auth',
    pages: [
      {
        label: 'Sign In',
        href: '/sign-in',
        icon: <FiLogIn />,
        description: 'Sign in page',
      },
      {
        label: 'Sign Up',
        href: '/sign-up',
        icon: <FiUserPlus />,
        description: 'Create account',
      },
      {
        label: 'Forgot Password',
        href: '/forgot-password',
        icon: <FiKey />,
        description: 'Password reset request',
      },
      {
        label: 'Reset Password',
        href: '/reset-password',
        icon: <FiShield />,
        description: 'Set new password',
      },
    ],
  },
  {
    title: 'Marketing',
    pages: [
      {
        label: 'Landing',
        href: '/landing',
        icon: <FiTerminal />,
        description: 'Marketing landing page',
      },
      {
        label: 'About',
        href: '/about',
        icon: <FiInfo />,
        description: 'App info & tech stack',
      },
      {
        label: 'Terms',
        href: '/terms',
        icon: <FiFileText />,
        description: 'Terms of service',
      },
      {
        label: 'Privacy',
        href: '/privacy',
        icon: <FiShieldOff />,
        description: 'Privacy policy',
      },
      {
        label: 'Coming Soon',
        href: '/coming-soon',
        icon: <FiClock2 />,
        description: 'Coming soon placeholder',
      },
      {
        label: 'Maintenance',
        href: '/maintenance',
        icon: <FiAlertCircle />,
        description: 'Maintenance mode page',
      },
    ],
  },
  {
    title: 'Store',
    pages: [
      {
        label: 'Store',
        href: '/store',
        icon: <FiShoppingBag />,
        description: 'Product listing',
      },
      {
        label: 'Cart',
        href: '/store/cart',
        icon: <FiShoppingCart />,
        description: 'Shopping cart',
      },
      {
        label: 'Checkout',
        href: '/store/checkout',
        icon: <FiCreditCard />,
        description: 'Checkout flow',
      },
      {
        label: 'Order Confirmation',
        href: '/store/order-confirmation',
        icon: <FiCheckCircle />,
        description: 'Order success page',
      },
      {
        label: 'Order History',
        href: '/store/order-history',
        icon: <FiClock2 />,
        description: 'Past orders',
      },
    ],
  },
  {
    title: 'Blog',
    pages: [
      {
        label: 'Blog',
        href: '/blog',
        icon: <FiBookOpen />,
        description: 'Blog index with posts',
      },
    ],
  },
];

const PagesDirectory: FC = () => (
  <div className="mx-auto max-w-5xl p-5">
    <h2 className="text-base-content mb-6 text-2xl font-light tracking-tight">
      Pages Directory
    </h2>
    <div className="flex flex-col gap-8">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="text-base-content/50 mb-3 text-xs tracking-[0.2em] uppercase">
            {group.title}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="border-base-content/10 bg-base-200 hover:border-base-content/30 flex items-center gap-3 rounded-xl border p-4 transition-colors">
                <span className="text-base-content/60 shrink-0">
                  {page.icon}
                </span>
                <div className="min-w-0">
                  <span className="text-base-content block truncate text-sm font-medium">
                    {page.label}
                  </span>
                  {page.description && (
                    <span className="text-base-content/50 block truncate text-xs">
                      {page.description}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { PagesDirectory };
