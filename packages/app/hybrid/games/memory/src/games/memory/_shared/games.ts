import type { GameItem } from '@/components/templates/GamesTemplate';
import { PiBrain, PiGridFour, PiLightning, PiPi } from 'react-icons/pi';

export const MEMORY_GAMES: GameItem[] = [
  {
    name: 'Memory Match',
    description: 'Emoji card pairing grid',
    icon: PiGridFour,
    href: '/memory/memory-match/',
  },
  {
    name: 'Pi',
    description: 'Pi digit memorization',
    icon: PiPi,
    href: '/memory/pi/',
  },
  {
    name: 'N-Back',
    description: 'Spatial n-back cognitive test',
    icon: PiBrain,
    href: '/memory/n-back/',
  },
  {
    name: 'Recall',
    description: 'Number flash memorization',
    icon: PiLightning,
    href: '/memory/recall/',
  },
];
