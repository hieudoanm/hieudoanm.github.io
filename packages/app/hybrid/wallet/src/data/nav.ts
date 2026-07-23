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
      { label: 'Exchange', href: '/exchange', icon: FiRepeat },
    ],
  },
  {
    label: 'Payments',
    items: [
      { label: 'Transfer', href: '/transfer', icon: FiSend },
      { label: 'Cards', href: '/cards', icon: FiCreditCard },
      { label: 'Pay', href: '/pay', icon: FiSmartphone },
    ],
  },
  {
    label: 'Budgeting',
    items: [
      { label: 'Budget', href: '/budget', icon: FiBarChart2 },
      { label: 'Bills', href: '/bills', icon: FiFileText },
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
