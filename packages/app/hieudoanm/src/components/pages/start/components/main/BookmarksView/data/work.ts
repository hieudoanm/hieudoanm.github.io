import {
  PiBriefcase,
  PiCodeSimple,
  PiNewspaper,
  PiPackage,
} from 'react-icons/pi';
import { ItemCardProps } from '@hieudoanm.github.io/components/pages/start/components/main/BookmarksView/ItemCard';

export const work: ItemCardProps[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    description: 'Social network',
    icon: PiBriefcase,
    //color: '#0077b5',
  },
  {
    label: 'Hacker News',
    href: 'https://news.ycombinator.com',
    description: 'News',
    icon: PiNewspaper,
    //color: '#ff6600',
  },
  {
    label: 'Indie Hackers',
    href: 'https://www.indiehackers.com',
    description: 'News',
    icon: PiCodeSimple,
    //color: '#ffa200',
  },
  {
    label: 'Product Hunt',
    href: 'https://www.producthunt.com',
    description: 'News',
    icon: PiPackage,
    //color: '#ffa200',
  },
];
