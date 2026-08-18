import {
  FiHome,
  FiDollarSign,
  FiFileText,
  FiShield,
  FiUser,
  FiSettings,
  FiPlus,
  FiBriefcase,
  FiUserCheck,
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

export const personalNavGroups: NavGroup[] = [
  {
    label: 'Personal',
    items: [
      { label: 'Dashboard', href: '/personal', icon: FiHome },
      { label: 'Calculator', href: '/personal/calculator', icon: FiDollarSign },
    ],
  },
  {
    label: 'Switch',
    items: [{ label: 'Business', href: '/business', icon: FiBriefcase }],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: FiUser },
      { label: 'Settings', href: '/settings', icon: FiSettings },
    ],
  },
];

export const businessNavGroups: NavGroup[] = [
  {
    label: 'Business',
    items: [{ label: 'Dashboard', href: '/business', icon: FiHome }],
  },
  {
    label: 'Tax Submission',
    items: [
      { label: 'Submissions', href: '/business/submission', icon: FiFileText },
      {
        label: 'New Submission',
        href: '/business/submission/new',
        icon: FiPlus,
      },
    ],
  },
  {
    label: 'Tax Audit',
    items: [{ label: 'Audits', href: '/business/audit', icon: FiShield }],
  },
  {
    label: 'Switch',
    items: [{ label: 'Personal', href: '/personal', icon: FiUserCheck }],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: FiUser },
      { label: 'Settings', href: '/settings', icon: FiSettings },
    ],
  },
];

export const personalBottomNavItems: NavItem[] = [
  { label: 'Home', href: '/personal', icon: FiHome },
  { label: 'Calculate', href: '/personal/calculator', icon: FiDollarSign },
  { label: 'Business', href: '/business', icon: FiBriefcase },
  { label: 'Profile', href: '/profile', icon: FiUser },
];

export const businessBottomNavItems: NavItem[] = [
  { label: 'Home', href: '/business', icon: FiHome },
  { label: 'Submit', href: '/business/submission', icon: FiFileText },
  { label: 'Audit', href: '/business/audit', icon: FiShield },
  { label: 'Personal', href: '/personal', icon: FiUserCheck },
  { label: 'Profile', href: '/profile', icon: FiUser },
];
