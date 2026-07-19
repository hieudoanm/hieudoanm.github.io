import {
  FiHome,
  FiFileText,
  FiShield,
  FiUser,
  FiSettings,
  FiPlus,
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

export const businessNavGroups: NavGroup[] = [
  {
    label: 'Business',
    items: [{ label: 'Dashboard', href: '/tax', icon: FiHome }],
  },
  {
    label: 'Tax Submission',
    items: [
      { label: 'Submissions', href: '/tax/submission', icon: FiFileText },
      {
        label: 'New Submission',
        href: '/tax/submission/new',
        icon: FiPlus,
      },
    ],
  },
  {
    label: 'Tax Audit',
    items: [{ label: 'Audits', href: '/tax/audit', icon: FiShield }],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: FiUser },
      { label: 'Settings', href: '/tax/settings', icon: FiSettings },
    ],
  },
];

export const businessBottomNavItems: NavItem[] = [
  { label: 'Home', href: '/tax', icon: FiHome },
  { label: 'Submit', href: '/tax/submission', icon: FiFileText },
  { label: 'Audit', href: '/tax/audit', icon: FiShield },
  { label: 'Profile', href: '/profile', icon: FiUser },
];
