'use client';

import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiBank,
  PiCalendar,
  PiCards,
  PiFlask,
  PiGlobeStand,
  PiMathOperations,
  PiMusicNote,
} from 'react-icons/pi';

const ITEMS = [
  {
    name: 'Languages',
    description: 'Vocabulary decks across languages',
    icon: PiCards,
    href: '/languages/',
  },
  {
    name: 'Music',
    description: 'Piano note recognition ear-training game',
    icon: PiMusicNote,
    href: '/music/',
  },
  {
    name: 'Chemistry',
    description: 'Interactive periodic table of elements',
    icon: PiFlask,
    href: '/chemistry/',
  },
  {
    name: 'History',
    description: 'Timeline and myth-vs-fact history games',
    icon: PiCalendar,
    href: '/history/',
  },
  {
    name: 'Economics',
    description: 'Game theory, markets, behavioral and macro concepts',
    icon: PiBank,
    href: '/economics/',
  },
  {
    name: 'Geography',
    description: 'Countries, continents, flags and capitals',
    icon: PiGlobeStand,
    href: '/geography/',
  },
  {
    name: 'Maths',
    description: 'Kaprekar constant routine explorer',
    icon: PiMathOperations,
    href: '/maths/',
  },
];

const HomePage: NextPage = () => {
  return (
    <GamesTemplate
      title="Lingo"
      subtitle="Learn languages — vocabulary, dictionary and sign language."
      items={ITEMS}
    />
  );
};

export default HomePage;
