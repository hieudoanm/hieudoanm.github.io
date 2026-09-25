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
  FiDownload,
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
    items: [{ label: 'Dashboard', href: '/wallet', icon: FiHome }],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Accounts', href: '/wallet/accounts', icon: FiDollarSign },
      { label: 'Transactions', href: '/wallet/transactions', icon: FiList },
      { label: 'Reports', href: '/wallet/reports', icon: FiPieChart },
      { label: 'Exchange', href: '/wallet/exchange', icon: FiRepeat },
    ],
  },
  {
    label: 'Payments',
    items: [
      { label: 'Transfer', href: '/wallet/transfer', icon: FiSend },
      { label: 'Contacts', href: '/wallet/contacts', icon: FiUsers },
      {
        label: 'Payment Requests',
        href: '/wallet/payment-requests',
        icon: FiArrowUpRight,
      },
      { label: 'Split Bill', href: '/wallet/split-bill', icon: FiGrid },
      { label: 'Cards', href: '/wallet/cards', icon: FiCreditCard },
      { label: 'Pay', href: '/wallet/pay', icon: FiSmartphone },
    ],
  },
  {
    label: 'Banking',
    items: [
      { label: 'Loans', href: '/wallet/loans', icon: FiTrendingUp },
      { label: 'Fixed Deposits', href: '/wallet/fixed-deposits', icon: FiLock },
      {
        label: 'Recurring Deposits',
        href: '/wallet/recurring-deposits',
        icon: FiRepeat,
      },
      { label: 'Savings Goals', href: '/wallet/savings-goals', icon: FiTarget },
      { label: 'Insurance', href: '/wallet/insurance', icon: FiShield },
      { label: 'Card Rewards', href: '/wallet/card-rewards', icon: FiGift },
    ],
  },
  {
    label: 'Budgeting',
    items: [
      { label: 'Budget', href: '/wallet/budget', icon: FiBarChart2 },
      { label: 'Bills', href: '/wallet/bills', icon: FiFileText },
      {
        label: 'Recurring',
        href: '/wallet/recurring-transfers',
        icon: FiRecurring,
      },
      {
        label: 'Currency Alerts',
        href: '/wallet/currency-alerts',
        icon: FiAlertTriangle,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Notifications', href: '/wallet/notifications', icon: FiBell },
      { label: 'Profile', href: '/wallet/profile', icon: FiUser },
      { label: 'Settings', href: '/wallet/settings', icon: FiSettings },
      { label: 'Downloads', href: '/downloads', icon: FiDownload },
    ],
  },
];

export const navItems: NavItem[] = navGroups.flatMap((g) => g.items);

export const bottomNavItems: NavItem[] = [
  { label: 'Home', href: '/wallet', icon: FiHome },
  { label: 'Accounts', href: '/wallet/accounts', icon: FiDollarSign },
  { label: 'Pay', href: '/wallet/pay', icon: FiSmartphone },
  { label: 'Cards', href: '/wallet/cards', icon: FiCreditCard },
  { label: 'More', href: '/wallet/profile', icon: FiUser },
];
