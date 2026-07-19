'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiMathOperations } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'music-pitch',
    name: 'Pitch Trainer',
    description: 'Train your pitch recognition skills',
    icon: PiMathOperations,
    href: '/music/pitch/',
    group: 'Music',
  },
];

const MusicPage: NextPage = () => (
  <GamesTemplate
    title="Music games"
    subtitle="Train your music skills"
    items={ITEMS}
  />
);

export default MusicPage;
