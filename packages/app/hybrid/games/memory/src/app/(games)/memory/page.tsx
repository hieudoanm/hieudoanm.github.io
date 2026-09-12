import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { PiBrain, PiGridFour, PiLightning, PiPi } from 'react-icons/pi';

const MEMORY_GAMES = [
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

const MemoryGamesPage: FC = () => (
  <GamesTemplate
    title="Memory"
    subtitle="Train your brain with memory and cognitive challenges."
    items={MEMORY_GAMES}
  />
);

export default MemoryGamesPage;
