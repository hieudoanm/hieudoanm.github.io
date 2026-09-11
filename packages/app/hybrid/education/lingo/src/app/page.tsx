'use client';

import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiCalendar, PiCards, PiFlask, PiMusicNote } from 'react-icons/pi';

const ITEMS = [
  {
    label: 'Languages',
    description: 'Vocabulary decks across languages',
    icon: PiCards,
    href: '/languages/',
  },
  {
    label: 'Music',
    description: 'Piano note recognition ear-training game',
    icon: PiMusicNote,
    href: '/music/',
  },
  {
    label: 'Chemistry',
    description: 'Interactive periodic table of elements',
    icon: PiFlask,
    href: '/chemistry/',
  },
  {
    label: 'History',
    description: 'Timeline and myth-vs-fact history games',
    icon: PiCalendar,
    href: '/history/',
  },
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      appName="Lingo"
      description="Learn languages — vocabulary, dictionary and sign language."
      items={ITEMS}
    />
  );
};

export default HomePage;
