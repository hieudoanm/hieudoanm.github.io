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
  {
    title: 'Customer Support',
    pages: [
      {
        label: 'Support Tickets',
        href: '/support/tickets',
        icon: <FiInbox />,
        description: 'Open tickets',
      },
      {
        label: 'Ticket Detail',
        href: '/support/ticket-detail',
        icon: <FiFileText />,
        description: 'Conversation & status',
      },
      {
        label: 'Live Chat',
        href: '/support/live-chat',
        icon: <FiSend />,
        description: 'Chat with an agent',
      },
      {
        label: 'Knowledge Base',
        href: '/support/knowledge-base',
        icon: <FiBook />,
        description: 'Help articles',
      },
      {
        label: 'FAQs',
        href: '/support/faqs',
        icon: <FiHelpCircle />,
        description: 'Frequently asked questions',
      },
      {
        label: 'Announcements',
        href: '/support/announcements',
        icon: <FiBell />,
        description: 'Service updates',
      },
      {
        label: 'Service Status',
        href: '/support/status',
        icon: <FiActivity />,
        description: 'Incidents & uptime',
      },
      {
        label: 'Feedback',
        href: '/support/feedback',
        icon: <FiMessageSquare />,
        description: 'Share feedback',
      },
    ],
  },
  {
    title: 'Email',
    pages: [
      {
        label: 'Inbox',
        href: '/mail/inbox',
        icon: <FiInbox />,
        description: 'Your messages',
      },
      {
        label: 'Compose',
        href: '/mail/compose',
        icon: <FiEdit2 />,
        description: 'Write a message',
      },
      {
        label: 'Thread',
        href: '/mail/thread',
        icon: <FiMessageSquare />,
        description: 'Message conversation',
      },
      {
        label: 'Drafts',
        href: '/mail/drafts',
        icon: <FiFileText />,
        description: 'Unsent messages',
      },
      {
        label: 'Sent',
        href: '/mail/sent',
        icon: <FiSend />,
        description: 'Sent messages',
      },
      {
        label: 'Spam',
        href: '/mail/spam',
        icon: <FiAlertOctagon />,
        description: 'Junk messages',
      },
      {
        label: 'Labels',
        href: '/mail/labels',
        icon: <FiTag />,
        description: 'Manage labels',
      },
      {
        label: 'Search',
        href: '/mail/search',
        icon: <FiSearch />,
        description: 'Find any message',
      },
    ],
  },
  {
    title: 'HR',
    pages: [
      {
        label: 'People Directory',
        href: '/hr/people',
        icon: <FiUsers />,
        description: 'Find team members',
      },
      {
        label: 'Org Chart',
        href: '/hr/org-chart',
        icon: <FiColumns />,
        description: 'Company structure',
      },
      {
        label: 'Hiring Pipeline',
        href: '/hr/hiring',
        icon: <FiUserPlus />,
        description: 'Candidates & stages',
      },
      {
        label: 'Policies',
        href: '/hr/policies',
        icon: <FiFileText />,
        description: 'Company policies',
      },
      {
        label: 'Benefits',
        href: '/hr/benefits',
        icon: <FiGift />,
        description: 'Perks & packages',
      },
      {
        label: 'Reviews',
        href: '/hr/reviews',
        icon: <FiStar />,
        description: 'Performance reviews',
      },
      {
        label: 'Shift Schedule',
        href: '/hr/shifts',
        icon: <FiCalendar />,
        description: 'Upcoming shifts',
      },
      {
        label: 'Time Off',
        href: '/hr/time-off',
        icon: <FiClock />,
        description: 'Leave requests',
      },
    ],
  },
  {
    title: 'Sales & CRM',
    pages: [
      {
        label: 'Accounts',
        href: '/crm/accounts',
        icon: <FiBriefcase />,
        description: 'Customer accounts',
      },
      {
        label: 'Contacts',
        href: '/crm/contacts',
        icon: <FiUsers />,
        description: 'People & companies',
      },
      {
        label: 'Leads',
        href: '/crm/leads',
        icon: <FiUserPlus />,
        description: 'New prospects',
      },
      {
        label: 'Deals',
        href: '/crm/deals',
        icon: <FiTag />,
        description: 'Open opportunities',
      },
      {
        label: 'Pipeline',
        href: '/crm/pipeline',
        icon: <FiColumns />,
        description: 'Deals by stage',
      },
      {
        label: 'Campaigns',
        href: '/crm/campaigns',
        icon: <FiSend />,
        description: 'Email campaigns',
      },
      {
        label: 'Quote Builder',
        href: '/crm/quote-builder',
        icon: <FiEdit3 />,
        description: 'Build a quote',
      },
      {
        label: 'Sales Reports',
        href: '/crm/reports',
        icon: <FiBarChart2 />,
        description: 'Team performance',
      },
    ],
  },
  {
    title: 'Learning',
    pages: [
      {
        label: 'My Courses',
        href: '/learning/my-courses',
        icon: <FiLayers />,
        description: 'Enrolled courses',
      },
      {
        label: 'Course Catalog',
        href: '/learning/catalog',
        icon: <FiBook />,
        description: 'Browse courses',
      },
      {
        label: 'Course Details',
        href: '/learning/course',
        icon: <FiBookOpen />,
        description: 'Curriculum & syllabus',
      },
      {
        label: 'Lesson Player',
        href: '/learning/lesson',
        icon: <FiMonitor />,
        description: 'Watch and learn',
      },
      {
        label: 'Instructors',
        href: '/learning/instructors',
        icon: <FiUser />,
        description: 'Meet the teachers',
      },
      {
        label: 'Quizzes',
        href: '/learning/quizzes',
        icon: <FiCheckSquare />,
        description: 'Test your knowledge',
      },
      {
        label: 'Achievements',
        href: '/learning/achievements',
        icon: <FiStar />,
        description: 'Badges & milestones',
      },
      {
        label: 'Analytics',
        href: '/learning/analytics',
        icon: <FiBarChart2 />,
        description: 'Learning progress',
      },
    ],
  },
  {
    title: 'News & Magazine',
    pages: [
      {
        label: 'Article',
        href: '/news/article',
        icon: <FiFileText />,
        description: 'Read the full story',
      },
      {
        label: 'Breaking News',
        href: '/news/breaking',
        icon: <FiZap />,
        description: 'Latest headlines',
      },
      {
        label: 'Editorial',
        href: '/news/editorial',
        icon: <FiEdit3 />,
        description: 'Editor picks',
      },
      {
        label: 'Magazine',
        href: '/news/magazine',
        icon: <FiBookOpen />,
        description: 'Feature stories',
      },
      {
        label: 'Categories',
        href: '/news/categories',
        icon: <FiGrid />,
        description: 'Browse by topic',
      },
      {
        label: 'Newsletter',
        href: '/news/newsletter',
        icon: <FiMail />,
        description: 'Subscribe by email',
      },
      {
        label: 'Opinion',
        href: '/news/opinion',
        icon: <FiMessageSquare />,
        description: 'Columns & views',
      },
      {
        label: 'Press Releases',
        href: '/news/press',
        icon: <FiUpload />,
        description: 'Media announcements',
      },
    ],
  },
  {
    title: 'Music',
    pages: [
      {
        label: 'Music Home',
        href: '/music/home',
        icon: <FiMonitor />,
        description: 'Home feed',
      },
      {
        label: 'Album',
        href: '/music/album',
        icon: <FiLayers />,
        description: 'Album details',
      },
      {
        label: 'Artists',
        href: '/music/artists',
        icon: <FiUser />,
        description: 'Followed artists',
      },
      {
        label: 'Charts',
        href: '/music/charts',
        icon: <FiBarChart2 />,
        description: 'Top tracks',
      },
      {
        label: 'Now Playing',
        href: '/music/now-playing',
        icon: <FiClock />,
        description: 'Current track',
      },
      {
        label: 'Playlist',
        href: '/music/playlist',
        icon: <FiFolder />,
        description: 'Your curated mix',
      },
      {
        label: 'Lyrics',
        href: '/music/lyrics',
        icon: <FiFileText />,
        description: 'Sing along',
      },
      {
        label: 'Search',
        href: '/music/search',
        icon: <FiSearch />,
        description: 'Find music',
      },
    ],
  },
  {
    title: 'Video Streaming',
    pages: [
      {
        label: 'Streaming Home',
        href: '/streaming/home',
        icon: <FiMonitor />,
        description: 'Recommendations',
      },
      {
        label: 'Movie',
        href: '/streaming/movie',
        icon: <FiBookOpen />,
        description: 'Movie details',
      },
      {
        label: 'Series',
        href: '/streaming/series',
        icon: <FiLayers />,
        description: 'Browse TV shows',
      },
      {
        label: 'Live TV',
        href: '/streaming/live',
        icon: <FiZap />,
        description: 'Live channels',
      },
      {
        label: 'Continue Watching',
        href: '/streaming/continue-watching',
        icon: <FiClock />,
        description: 'Resume titles',
      },
      {
        label: 'My List',
        href: '/streaming/my-list',
        icon: <FiHeart />,
        description: 'Titles you saved',
      },
      {
        label: 'History',
        href: '/streaming/history',
        icon: <FiRefreshCw />,
        description: 'Watch history',
      },
      {
        label: 'Search',
        href: '/streaming/search',
        icon: <FiSearch />,
        description: 'Find titles',
      },
    ],
  },
  {
    title: 'Gaming',
    pages: [
      {
        label: 'Game Catalog',
        href: '/gaming/catalog',
        icon: <FiGrid />,
        description: 'Browse every title',
      },
      {
        label: 'Game Details',
        href: '/gaming/game',
        icon: <FiMonitor />,
        description: 'Game details',
      },
      {
        label: 'Challenges',
        href: '/gaming/challenges',
        icon: <FiTarget />,
        description: 'Daily & weekly quests',
      },
      {
        label: 'Leaderboards',
        href: '/gaming/leaderboards',
        icon: <FiBarChart2 />,
        description: 'Top players',
      },
      {
        label: 'Live Matches',
        href: '/gaming/matches',
        icon: <FiActivity />,
        description: 'Ongoing games',
      },
      {
        label: 'Players',
        href: '/gaming/players',
        icon: <FiUser />,
        description: 'Player profiles',
      },
      {
        label: 'Tournaments',
        href: '/gaming/tournaments',
        icon: <FiShield />,
        description: 'Competitions',
      },
      {
        label: 'Game News',
        href: '/gaming/news',
        icon: <FiZap />,
        description: 'Patch notes & updates',
      },
    ],
  },
  {
    title: 'Sports',
    pages: [
      {
        label: 'Live Scores',
        href: '/sports/scores',
        icon: <FiActivity />,
        description: 'Scores from today',
      },
      {
        label: 'Fixtures',
        href: '/sports/fixtures',
        icon: <FiCalendar />,
        description: 'Upcoming matches',
      },
      {
        label: 'Match Details',
        href: '/sports/match',
        icon: <FiMonitor />,
        description: 'Match details',
      },
      {
        label: 'Standings',
        href: '/sports/standings',
        icon: <FiColumns />,
        description: 'League table',
      },
      {
        label: 'Player Stats',
        href: '/sports/stats',
        icon: <FiBarChart2 />,
        description: 'Goals & assists',
      },
      {
        label: 'Team Roster',
        href: '/sports/roster',
        icon: <FiUsers />,
        description: 'Meet the squad',
      },
      {
        label: 'Favorite Teams',
        href: '/sports/favorites',
        icon: <FiHeart />,
        description: 'Teams you follow',
      },
      {
        label: 'Sports News',
        href: '/sports/news',
        icon: <FiBell />,
        description: 'Latest headlines',
      },
    ],
  },
  {
    title: 'Travel',
    pages: [
      {
        label: 'Bookings',
        href: '/travel/bookings',
        icon: <FiCalendar />,
        description: 'Upcoming trips',
      },
      {
        label: 'Booking Search',
        href: '/travel/search',
        icon: <FiSearch />,
        description: 'Find stays',
      },
      {
        label: 'Hotel',
        href: '/travel/hotel',
        icon: <FiLayers />,
        description: 'Hotel details',
      },
      {
        label: 'Destinations',
        href: '/travel/destinations',
        icon: <FiMapPin />,
        description: 'Explore places',
      },
      {
        label: 'Guides',
        href: '/travel/guides',
        icon: <FiBook />,
        description: 'City guides',
      },
      {
        label: 'Stories',
        href: '/travel/stories',
        icon: <FiBookOpen />,
        description: 'Travel experiences',
      },
      {
        label: 'Packing List',
        href: '/travel/packing',
        icon: <FiCheckSquare />,
        description: 'What to pack',
      },
      {
        label: 'Trip Planner',
        href: '/travel/planner',
        icon: <FiMap />,
        description: 'Plan an itinerary',
      },
    ],
  },
  {
    title: 'Food & Dining',
    pages: [
      {
        label: 'Restaurants',
        href: '/food/restaurants',
        icon: <FiMapPin />,
        description: 'Find a place to eat',
      },
      {
        label: 'Restaurant',
        href: '/food/restaurant',
        icon: <FiStar />,
        description: 'Restaurant details',
      },
      {
        label: 'Menu',
        href: '/food/menu',
        icon: <FiFileText />,
        description: 'Dishes and prices',
      },
      {
        label: 'Recipes',
        href: '/food/recipes',
        icon: <FiBookOpen />,
        description: 'Cook at home',
      },
      {
        label: 'Recipe',
        href: '/food/recipe',
        icon: <FiBook />,
        description: 'Step by step',
      },
      {
        label: 'Reservations',
        href: '/food/reservations',
        icon: <FiCalendar />,
        description: 'Upcoming bookings',
      },
      {
        label: 'Delivery',
        href: '/food/delivery',
        icon: <FiTruck />,
        description: 'Order in',
      },
      {
        label: 'Wine List',
        href: '/food/wine',
        icon: <FiTag />,
        description: 'Pairings & bottles',
      },
    ],
  },
  {
    title: 'Health & Fitness',
    pages: [
      {
        label: 'Health Dashboard',
        href: '/health/dashboard',
        icon: <FiGrid />,
        description: 'Daily overview',
      },
      {
        label: 'Activity Tracker',
        href: '/health/activity',
        icon: <FiActivity />,
        description: 'Daily movement',
      },
      {
        label: 'Workout Plans',
        href: '/health/workout',
        icon: <FiZap />,
        description: 'Training routines',
      },
      {
        label: 'Nutrition Tracker',
        href: '/health/nutrition',
        icon: <FiHeart />,
        description: 'Macros & meals',
      },
      {
        label: 'Sleep Tracker',
        href: '/health/sleep',
        icon: <FiClock />,
        description: 'Recovery and rest',
      },
      {
        label: 'Water Intake',
        href: '/health/water',
        icon: <FiRefreshCw />,
        description: 'Hydration goal',
      },
      {
        label: 'Goals',
        href: '/health/goals',
        icon: <FiTarget />,
        description: 'Daily health targets',
      },
      {
        label: 'Health Profile',
        href: '/health/profile',
        icon: <FiUser />,
        description: 'Your health data',
      },
    ],
  },
  {
    title: 'Real Estate',
    pages: [
      {
        label: 'Property Listings',
        href: '/real-estate/listings',
        icon: <FiGrid />,
        description: 'Browse properties',
      },
      {
        label: 'Property Detail',
        href: '/real-estate/property',
        icon: <FiLayers />,
        description: 'Property details',
      },
      {
        label: 'Search Filters',
        href: '/real-estate/search',
        icon: <FiSearch />,
        description: 'Refine results',
      },
      {
        label: 'Map View',
        href: '/real-estate/map',
        icon: <FiMap />,
        description: 'Neighborhood map',
      },
      {
        label: 'Saved Properties',
        href: '/real-estate/saved',
        icon: <FiHeart />,
        description: 'Your shortlist',
      },
      {
        label: 'Mortgage Calculator',
        href: '/real-estate/mortgage',
        icon: <FiCreditCard />,
        description: 'Monthly payments',
      },
      {
        label: 'Open Houses',
        href: '/real-estate/open-houses',
        icon: <FiCalendar />,
        description: 'Tour schedules',
      },
      {
        label: 'Agent Profile',
        href: '/real-estate/agents',
        icon: <FiUser />,
        description: 'Meet the agent',
      },
    ],
  },
  {
    title: 'Smart Home / IoT',
    pages: [
      {
        label: 'Device Dashboard',
        href: '/iot/dashboard',
        icon: <FiMonitor />,
        description: 'All connected devices',
      },
      {
        label: 'Device Detail',
        href: '/iot/device',
        icon: <FiZap />,
        description: 'Control a device',
      },
      {
        label: 'Scenes',
        href: '/iot/scenes',
        icon: <FiLayers />,
        description: 'One-tap routines',
      },
      {
        label: 'Automations',
        href: '/iot/automations',
        icon: <FiClock />,
        description: 'Scheduled actions',
      },
      {
        label: 'Energy Usage',
        href: '/iot/energy',
        icon: <FiActivity />,
        description: 'Consumption trends',
      },
      {
        label: 'Security',
        href: '/iot/security',
        icon: <FiShield />,
        description: 'Cameras & sensors',
      },
      {
        label: 'Sensor Data',
        href: '/iot/sensors',
        icon: <FiBarChart2 />,
        description: 'Live readings',
      },
      {
        label: 'Smart Home Settings',
        href: '/iot/settings',
        icon: <FiSettings />,
        description: 'Preferences',
      },
    ],
  },
  {
    title: 'Portfolio',
    pages: [
      {
        label: 'Portfolio Overview',
        href: '/portfolio/overview',
        icon: <FiTrendingUp />,
        description: 'Net worth & gains',
      },
      {
        label: 'Holdings',
        href: '/portfolio/holdings',
        icon: <FiBriefcase />,
        description: 'Positions & value',
      },
      {
        label: 'Transactions',
        href: '/portfolio/transactions',
        icon: <FiRefreshCw />,
        description: 'Buy & sell history',
      },
      {
        label: 'Performance',
        href: '/portfolio/performance',
        icon: <FiBarChart2 />,
        description: 'Returns over time',
      },
      {
        label: 'Allocation',
        href: '/portfolio/allocation',
        icon: <FiColumns />,
        description: 'Asset mix',
      },
      {
        label: 'Watchlist',
        href: '/portfolio/watchlist',
        icon: <FiStar />,
        description: 'Tracked symbols',
      },
      {
        label: 'Alerts',
        href: '/portfolio/alerts',
        icon: <FiBell />,
        description: 'Price notifications',
      },
      {
        label: 'Dividend Income',
        href: '/portfolio/dividends',
        icon: <FiDollarSign />,
        description: 'Payout tracking',
      },
      {
        label: 'Portfolio Settings',
        href: '/portfolio/settings',
        icon: <FiSettings />,
        description: 'Preferences',
      },
    ],
  },
];

const PAGE_COUNT = GROUPS.reduce(
  (total, group) => total + group.pages.length,
  0
);
const TEMPLATE_COUNT = 261;

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
