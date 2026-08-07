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
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCheckSquare,
  FiChevronDown,
  FiChevronsRight,
  FiChevronsUp,
  FiColumns,
  FiCreditCard,
  FiClock,
  FiClock as FiClock2,
  FiDollarSign,
  FiEdit2,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiGift,
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
  FiMap,
  FiMapPin,
  FiMessageSquare,
  FiMonitor,
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
  FiStar,
  FiTable,
  FiTag,
  FiTarget,
  FiTerminal,
  FiTrash2,
  FiTruck,
  FiTrendingUp,
  FiUpload,
  FiUser,
  FiUserPlus,
  FiUsers,
  FiZap,
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
      {
        label: 'Expenses',
        href: '/expenses',
        icon: <FiDollarSign />,
        description: 'Expense tracker',
      },
      {
        label: 'Timesheets',
        href: '/timesheets',
        icon: <FiClock />,
        description: 'Weekly timesheet entries',
      },
      {
        label: 'Goals',
        href: '/goals',
        icon: <FiTarget />,
        description: 'Objective & progress tracking',
      },
      {
        label: 'Roadmap',
        href: '/roadmap',
        icon: <FiMap />,
        description: 'Product roadmap timeline',
      },
      {
        label: 'Sprints',
        href: '/sprints',
        icon: <FiZap />,
        description: 'Sprint board & velocity',
      },
      {
        label: 'Reports',
        href: '/reports',
        icon: <FiFileText />,
        description: 'Generated report cards',
      },
      {
        label: 'Contacts',
        href: '/contacts',
        icon: <FiUsers />,
        description: 'Contact list & search',
      },
      {
        label: 'Whiteboard',
        href: '/whiteboard',
        icon: <FiEdit3 />,
        description: 'Collaborative whiteboard',
      },
      {
        label: 'Meetings',
        href: '/meetings',
        icon: <FiCalendar />,
        description: 'Scheduled meetings',
      },
      {
        label: 'Shortcuts',
        href: '/shortcuts',
        icon: <FiTerminal />,
        description: 'Keyboard shortcuts',
      },
      {
        label: 'Import',
        href: '/import',
        icon: <FiUpload />,
        description: 'Data import flow',
      },
      {
        label: 'Webhooks',
        href: '/webhooks',
        icon: <FiLink />,
        description: 'Webhook endpoints',
      },
      {
        label: 'Permissions',
        href: '/permissions',
        icon: <FiLock />,
        description: 'Role permissions matrix',
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
      {
        label: 'Accordion',
        href: '/accordion',
        icon: <FiChevronDown />,
        description: 'Collapsible accordion',
      },
      {
        label: 'Alerts',
        href: '/alerts',
        icon: <FiAlertCircle />,
        description: 'Alert banner variants',
      },
      {
        label: 'Tabs',
        href: '/tabs',
        icon: <FiLayers />,
        description: 'Tab navigation examples',
      },
      {
        label: 'Pagination',
        href: '/pagination',
        icon: <FiChevronsRight />,
        description: 'Paginated list',
      },
      {
        label: 'Tooltips',
        href: '/tooltips',
        icon: <FiMessageSquare />,
        description: 'Tooltip examples',
      },
      {
        label: 'Stepper',
        href: '/stepper',
        icon: <FiChevronsUp />,
        description: 'Multi-step stepper',
      },
      {
        label: 'Upload',
        href: '/upload',
        icon: <FiUpload />,
        description: 'File upload dropzone',
      },
      {
        label: 'Empty States',
        href: '/empty-states',
        icon: <FiInbox />,
        description: 'Empty state placeholders',
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
      {
        label: 'Sessions',
        href: '/sessions',
        icon: <FiMonitor />,
        description: 'Active login sessions',
      },
      {
        label: 'Recovery Codes',
        href: '/recovery-codes',
        icon: <FiShield />,
        description: 'Two-factor recovery codes',
      },
      {
        label: 'Delete Account',
        href: '/delete-account',
        icon: <FiTrash2 />,
        description: 'Account deletion flow',
      },
      {
        label: 'Security',
        href: '/security',
        icon: <FiLock />,
        description: 'Security overview',
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
      {
        label: 'Pricing',
        href: '/pricing',
        icon: <FiCreditCard />,
        description: 'Pricing plans',
      },
      {
        label: 'Contact',
        href: '/contact',
        icon: <FiMail />,
        description: 'Contact form',
      },
      {
        label: 'Careers',
        href: '/careers',
        icon: <FiBriefcase />,
        description: 'Job listings',
      },
      {
        label: 'Team',
        href: '/team',
        icon: <FiUsers />,
        description: 'Team directory',
      },
      {
        label: 'Changelog',
        href: '/changelog',
        icon: <FiClock />,
        description: 'Release notes',
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
      {
        label: 'Deals',
        href: '/store/deals',
        icon: <FiTag />,
        description: 'Discount deals',
      },
      {
        label: 'Categories',
        href: '/store/categories',
        icon: <FiGrid />,
        description: 'Product categories',
      },
      {
        label: 'Reviews',
        href: '/store/reviews',
        icon: <FiStar />,
        description: 'Customer reviews',
      },
      {
        label: 'Support',
        href: '/store/support',
        icon: <FiHelpCircle />,
        description: 'Customer support',
      },
      {
        label: 'Gift Cards',
        href: '/store/gift-cards',
        icon: <FiGift />,
        description: 'Gift card purchase',
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
      {
        label: 'Categories',
        href: '/blog/categories',
        icon: <FiFolder />,
        description: 'Blog category explorer',
      },
      {
        label: 'Tags',
        href: '/blog/tags',
        icon: <FiTag />,
        description: 'Posts grouped by tag',
      },
      {
        label: 'Search',
        href: '/blog/search',
        icon: <FiSearch />,
        description: 'Live post search',
      },
    ],
  },
  {
    title: 'Commerce Admin',
    pages: [
      {
        label: 'Products',
        href: '/admin/products',
        icon: <FiShoppingBag />,
        description: 'Product catalog admin',
      },
      {
        label: 'Orders',
        href: '/admin/orders',
        icon: <FiShoppingCart />,
        description: 'Order management',
      },
      {
        label: 'Customers',
        href: '/admin/customers',
        icon: <FiUsers />,
        description: 'Customer directory',
      },
      {
        label: 'Inventory',
        href: '/admin/inventory',
        icon: <FiArchive />,
        description: 'Stock level management',
      },
      {
        label: 'Coupons',
        href: '/admin/coupons',
        icon: <FiTag />,
        description: 'Discount coupon management',
      },
      {
        label: 'Promotions',
        href: '/admin/promotions',
        icon: <FiStar />,
        description: 'Promo campaign builder',
      },
      {
        label: 'Refunds',
        href: '/admin/refunds',
        icon: <FiDollarSign />,
        description: 'Refund requests',
      },
      {
        label: 'Shipments',
        href: '/admin/shipments',
        icon: <FiTruck />,
        description: 'Shipment logistics',
      },
    ],
  },
  {
    title: 'Finance',
    pages: [
      {
        label: 'Invoices',
        href: '/finance/invoices',
        icon: <FiFileText />,
        description: 'Client invoice tracking',
      },
      {
        label: 'Budgets',
        href: '/finance/budgets',
        icon: <FiBarChart2 />,
        description: 'Budget spending tracker',
      },
      {
        label: 'Subscriptions',
        href: '/finance/subscriptions',
        icon: <FiRefreshCw />,
        description: 'Recurring subscription plans',
      },
      {
        label: 'Transactions',
        href: '/finance/transactions',
        icon: <FiCreditCard />,
        description: 'Account transactions ledger',
      },
      {
        label: 'Taxes',
        href: '/finance/taxes',
        icon: <FiDollarSign />,
        description: 'Sales tax regions',
      },
      {
        label: 'Payroll',
        href: '/finance/payroll',
        icon: <FiBriefcase />,
        description: 'Employee payroll runs',
      },
      {
        label: 'Statements',
        href: '/finance/statements',
        icon: <FiTable />,
        description: 'Monthly account statements',
      },
      {
        label: 'Accounts',
        href: '/finance/accounts',
        icon: <FiShield />,
        description: 'Linked bank accounts',
      },
    ],
  },
  {
    title: 'Developer',
    pages: [
      {
        label: 'API Keys',
        href: '/developer/api-keys',
        icon: <FiKey />,
        description: 'Create and manage access keys',
      },
      {
        label: 'Feature Flags',
        href: '/developer/feature-flags',
        icon: <FiZap />,
        description: 'Toggle features per environment',
      },
      {
        label: 'Environments',
        href: '/developer/environments',
        icon: <FiMonitor />,
        description: 'Monitor deployment environments',
      },
      {
        label: 'Deployments',
        href: '/developer/deployments',
        icon: <FiUpload />,
        description: 'Review deployment history',
      },
      {
        label: 'Logs',
        href: '/developer/logs',
        icon: <FiFileText />,
        description: 'Inspect application log output',
      },
      {
        label: 'Endpoints',
        href: '/developer/endpoints',
        icon: <FiLink />,
        description: 'Explore the public API surface',
      },
      {
        label: 'Monitors',
        href: '/developer/monitors',
        icon: <FiActivity />,
        description: 'Track service availability',
      },
      {
        label: 'Backups',
        href: '/developer/backups',
        icon: <FiArchive />,
        description: 'Manage backup schedules and restores',
      },
    ],
  },
  {
    title: 'Social & Media',
    pages: [
      {
        label: 'Feed',
        href: '/social/feed',
        icon: <FiMessageSquare />,
        description: 'Latest updates from your network',
      },
      {
        label: 'Messages',
        href: '/social/messages',
        icon: <FiMail />,
        description: 'Direct messages',
      },
      {
        label: 'Events',
        href: '/social/events',
        icon: <FiCalendar />,
        description: 'Discover community events',
      },
      {
        label: 'Groups',
        href: '/social/groups',
        icon: <FiUsers />,
        description: 'Join communities that share your interests',
      },
      {
        label: 'Followers',
        href: '/social/followers',
        icon: <FiUserPlus />,
        description: 'Manage who you follow',
      },
      {
        label: 'Media Library',
        href: '/media/library',
        icon: <FiFolder />,
        description: 'Browse and manage uploaded assets',
      },
      {
        label: 'Albums',
        href: '/media/albums',
        icon: <FiGrid />,
        description: 'Organize photos into albums',
      },
      {
        label: 'Video Player',
        href: '/media/video',
        icon: <FiSmartphone />,
        description: 'Watch recorded content',
      },
    ],
  },
];

const PAGE_COUNT = GROUPS.reduce(
  (total, group) => total + group.pages.length,
  0
);
const TEMPLATE_COUNT = 132;

const PagesDirectory: FC = () => (
  <div className="mx-auto max-w-5xl p-5">
    <h2 className="text-base-content mb-6 text-2xl font-light tracking-tight">
      Pages Directory ({PAGE_COUNT} pages, {TEMPLATE_COUNT} templates)
    </h2>
    <div className="flex flex-col gap-8">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="text-base-content/50 mb-3 text-xs tracking-[0.2em] uppercase">
            {group.title} ({group.pages.length})
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
