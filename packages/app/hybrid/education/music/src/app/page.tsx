'use client';

import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiMusicNote } from 'react-icons/pi';

const ITEMS = [
  {
    label: 'Pitch',
    description: 'Guess-the-note ear-training game',
    icon: PiMusicNote,
    href: '/pitch/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="Music"
    description="Train your ear and learn music theory."
    items={ITEMS}
  />
);

export default HomePage;
