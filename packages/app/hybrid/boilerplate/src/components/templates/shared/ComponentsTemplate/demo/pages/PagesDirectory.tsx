'use client';

import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import {
  FiActivity,
  FiAlertCircle,
  FiAlertOctagon,
  FiArchive,
  FiBarChart2,
  FiBell,
  FiBook,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiCheckSquare,
  FiColumns,
  FiCreditCard,
  FiClock,
  FiClock as FiClock2,
  FiDollarSign,
  FiEdit2,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiGrid,
  FiHeart,
  FiHelpCircle,
  FiInbox,
  FiInfo,
  FiKey,
  FiLayers,
  FiLink,
  FiLock,
  FiLogIn,
  FiMail,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
  FiSend,
  FiSettings,
  FiShield,
  FiShieldOff,
  FiShoppingBag,
  FiShoppingCart,
  FiShuffle,
  FiSmartphone,
  FiTable,
  FiTerminal,
  FiTruck,
  FiTrendingUp,
  FiUser,
  FiUserPlus,
  FiUsers,
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
        label: 'Chat',
        href: '/chat',
        icon: <FiBookOpen />,
        description: 'Chat conversations',
      },
      {
        label: 'Onboarding',
        href: '/onboarding',
        icon: <FiUser />,
        description: 'Multi-step onboarding flow',
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
    title: 'App Workspace',
    pages: [
      {
        label: 'Analytics',
        href: '/analytics',
        icon: <FiTrendingUp />,
        description: 'Usage metrics dashboard',
      },
      {
        label: 'Calendar',
        href: '/calendar',
        icon: <FiCalendar />,
        description: 'Monthly events calendar',
      },
      {
        label: 'Kanban',
        href: '/kanban',
        icon: <FiColumns />,
        description: 'Drag-style task board',
      },
      {
        label: 'Inbox',
        href: '/inbox',
        icon: <FiInbox />,
        description: 'Email inbox',
      },
      {
        label: 'Tasks',
        href: '/tasks',
        icon: <FiCheckSquare />,
        description: 'Todo list with filters',
      },
      {
        label: 'Notes',
        href: '/notes',
        icon: <FiEdit3 />,
        description: 'Inline editable notes',
      },
      {
        label: 'Files',
        href: '/files',
        icon: <FiFolder />,
        description: 'File browser',
      },
      {
        label: 'Help Center',
        href: '/help',
        icon: <FiHelpCircle />,
        description: 'Searchable FAQ categories',
      },
      {
        label: 'Members',
        href: '/members',
        icon: <FiUsers />,
        description: 'Team member roles',
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: <FiBell />,
        description: 'Notification feed',
      },
      {
        label: 'Billing',
        href: '/billing',
        icon: <FiDollarSign />,
        description: 'Plan & usage summary',
      },
      {
        label: 'Integrations',
        href: '/integrations',
        icon: <FiLink />,
        description: 'Connected services',
      },
      {
        label: 'Activity Log',
        href: '/activity',
        icon: <FiActivity />,
        description: 'Recent user activity',
      },
    ],
  },
  {
    title: 'Data & UI Showcase',
    pages: [
      {
        label: 'Data Table',
        href: '/data-table',
        icon: <FiTable />,
        description: 'Sortable data grid',
      },
      {
        label: 'Forms',
        href: '/forms',
        icon: <FiEdit2 />,
        description: 'Form control gallery',
      },
      {
        label: 'Charts',
        href: '/charts',
        icon: <FiBarChart2 />,
        description: 'Chart gallery',
      },
      {
        label: 'Modals',
        href: '/modals',
        icon: <FiLayers />,
        description: 'Modal & dialog examples',
      },
      {
        label: 'Forbidden',
        href: '/forbidden',
        icon: <FiAlertOctagon />,
        description: '403 access denied page',
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
      {
        label: 'Verify Email',
        href: '/verify-email',
        icon: <FiMail />,
        description: 'Email verification prompt',
      },
      {
        label: 'Two-Factor',
        href: '/two-factor',
        icon: <FiSmartphone />,
        description: '2FA code entry',
      },
      {
        label: 'Lock Screen',
        href: '/lock-screen',
        icon: <FiLock />,
        description: 'Session lock page',
      },
      {
        label: 'Change Password',
        href: '/change-password',
        icon: <FiRefreshCw />,
        description: 'Update password form',
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
      {
        label: 'Resume',
        href: '/resume',
        icon: <FiFileText />,
        description: 'Resume template',
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
        label: 'Product',
        href: '/store/1',
        icon: <FiShoppingBag />,
        description: 'Product detail (dynamic, /store/[id])',
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
        icon: <FiArchive />,
        description: 'Past orders',
      },
      {
        label: 'Wishlist',
        href: '/store/wishlist',
        icon: <FiHeart />,
        description: 'Saved products',
      },
      {
        label: 'Compare',
        href: '/store/compare',
        icon: <FiShuffle />,
        description: 'Product comparison',
      },
      {
        label: 'Addresses',
        href: '/store/addresses',
        icon: <FiMapPin />,
        description: 'Saved shipping addresses',
      },
      {
        label: 'Payment Methods',
        href: '/store/payment-methods',
        icon: <FiCreditCard />,
        description: 'Saved payment cards',
      },
      {
        label: 'Order Tracking',
        href: '/store/tracking',
        icon: <FiTruck />,
        description: 'Shipment timeline',
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
      {
        label: 'Blog Post',
        href: '/blog/getting-started',
        icon: <FiBook />,
        description: 'Blog post detail (dynamic, /blog/[slug])',
      },
      {
        label: 'Archive',
        href: '/blog/archive',
        icon: <FiArchive />,
        description: 'Posts by month',
      },
      {
        label: 'Author',
        href: '/blog/author',
        icon: <FiUser />,
        description: 'Author profile & posts',
      },
      {
        label: 'Newsletter',
        href: '/blog/newsletter',
        icon: <FiSend />,
        description: 'Subscribe form',
      },
    ],
  },
];

const PAGE_COUNT = GROUPS.reduce(
  (total, group) => total + group.pages.length,
  0
);
const TEMPLATE_COUNT = 62;

const PagesDirectory: FC = () => (
  <div className="mx-auto max-w-5xl p-5">
    <h2 className="text-base-content mb-6 text-2xl font-light tracking-tight">
      Pages Directory ({PAGE_COUNT} pages, {TEMPLATE_COUNT} templates)
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
