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
} from 'react-icons/fi';

export const navItems = [
  { label: 'Dashboard', href: '/', icon: FiHome },
  { label: 'Accounts', href: '/accounts', icon: FiDollarSign },
  { label: 'Transactions', href: '/transactions', icon: FiList },
  { label: 'Transfer', href: '/transfer', icon: FiSend },
  { label: 'Cards', href: '/cards', icon: FiCreditCard },
  { label: 'Budget', href: '/budget', icon: FiBarChart2 },
  { label: 'Pay', href: '/pay', icon: FiSmartphone },
  { label: 'Bills', href: '/bills', icon: FiFileText },
  { label: 'Exchange', href: '/exchange', icon: FiRepeat },
  { label: 'Notifications', href: '/notifications', icon: FiBell },
  { label: 'Profile', href: '/profile', icon: FiUser },
];

export const bottomNavItems = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Accounts', href: '/accounts', icon: FiDollarSign },
  { label: 'Pay', href: '/pay', icon: FiSmartphone },
  { label: 'Cards', href: '/cards', icon: FiCreditCard },
  { label: 'More', href: '/profile', icon: FiUser },
];
