import { PiDatabase, PiGithubLogo, PiGlobe, PiRobot } from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/components/main/BookmarksView/ItemCard';

export const code: ItemCardProps[] = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    description: 'Git',
    icon: PiGithubLogo,
    //color: '#6e40c9',
  },
  {
    label: 'Renovate',
    href: 'https://developer.mend.io',
    description: 'Code',
    icon: PiRobot,
    //color: '#9b59b6',
  },
  {
    label: 'Vercel',
    href: 'https://vercel.com',
    description: 'Deployment',
    icon: PiGlobe,
    //color: '#000000',
  },
  {
    label: 'Supabase',
    href: 'https://supabase.com',
    description: 'Database',
    icon: PiDatabase,
    //color: '#3ECF8E',
  },
];
