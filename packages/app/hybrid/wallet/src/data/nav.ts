import {
  FiHome,
  FiDollarSign,
  FiList,
  FiSend,
  FiCreditCard,
  FiBarChart2,
  FiSmartphone,
  FiFileText,
  FiRepeat,
  FiBell,
  FiUser,
  FiSettings,
  FiUsers,
  FiPieChart,
  FiArrowUpRight,
  FiRepeat as FiRecurring,
  FiAlertTriangle,
  FiGrid,
  FiTrendingUp,
  FiLock,
  FiTarget,
  FiShield,
  FiGift,
} from 'react-icons/fi';

export interface NavItem {
  label: string;
  href: string;
  icon: typeof FiHome;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/', icon: FiHome }],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Accounts', href: '/accounts', icon: FiDollarSign },
      { label: 'Transactions', href: '/transactions', icon: FiList },
      { label: 'Reports', href: '/reports', icon: FiPieChart },
      { label: 'Exchange', href: '/exchange', icon: FiRepeat },
    ],
  },
  {
    label: 'Payments',
    items: [
      { label: 'Transfer', href: '/transfer', icon: FiSend },
      { label: 'Contacts', href: '/contacts', icon: FiUsers },
      {
        label: 'Payment Requests',
        href: '/payment-requests',
        icon: FiArrowUpRight,
      },
      { label: 'Split Bill', href: '/split-bill', icon: FiGrid },
      { label: 'Cards', href: '/cards', icon: FiCreditCard },
      { label: 'Pay', href: '/pay', icon: FiSmartphone },
    ],
  },
  {
    label: 'Banking',
    items: [
      { label: 'Loans', href: '/loans', icon: FiTrendingUp },
      { label: 'Fixed Deposits', href: '/fixed-deposits', icon: FiLock },
      {
        label: 'Recurring Deposits',
        href: '/recurring-deposits',
        icon: FiRepeat,
      },
      { label: 'Savings Goals', href: '/savings-goals', icon: FiTarget },
      { label: 'Insurance', href: '/insurance', icon: FiShield },
      { label: 'Card Rewards', href: '/card-rewards', icon: FiGift },
    ],
  },
  {
    label: 'Budgeting',
    items: [
      { label: 'Budget', href: '/budget', icon: FiBarChart2 },
      { label: 'Bills', href: '/bills', icon: FiFileText },
      { label: 'Recurring', href: '/recurring-transfers', icon: FiRecurring },
      {
        label: 'Currency Alerts',
        href: '/currency-alerts',
        icon: FiAlertTriangle,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Notifications', href: '/notifications', icon: FiBell },
      { label: 'Profile', href: '/profile', icon: FiUser },
      { label: 'Settings', href: '/settings', icon: FiSettings },
    ],
  },
];

export const navItems: NavItem[] = navGroups.flatMap((g) => g.items);

export const bottomNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Accounts', href: '/accounts', icon: FiDollarSign },
  { label: 'Pay', href: '/pay', icon: FiSmartphone },
  { label: 'Cards', href: '/cards', icon: FiCreditCard },
  { label: 'More', href: '/profile', icon: FiUser },
];
