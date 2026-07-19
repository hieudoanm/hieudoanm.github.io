import {
  PiAlien,
  PiCamera,
  PiFacebookLogo,
  PiMusicNote,
  PiThreadsLogo,
  PiTwitterLogo,
} from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/components/main/BookmarksView/ItemCard';

export const social: ItemCardProps[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    description: 'Social network',
    icon: PiFacebookLogo,
    //color: '#4267B2',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    description: 'Photos',
    icon: PiCamera,
    //color: '#e1306c',
  },
  {
    label: 'Reddit',
    href: 'https://reddit.com',
    description: 'Social network',
    icon: PiAlien,
    //color: '#ff4500',
  },
  {
    label: 'Threads',
    href: 'https://threads.net',
    description: 'Social network',
    icon: PiThreadsLogo,
    //color: '#000000',
  },
  {
    label: 'Tiktok',
    href: 'https://www.tiktok.com',
    description: 'Social network',
    icon: PiMusicNote,
    //color: '#000000',
  },
  {
    label: 'X',
    href: 'https://x.com',
    description: 'Social network',
    icon: PiTwitterLogo,
    //color: '#0088cc',
  },
];
