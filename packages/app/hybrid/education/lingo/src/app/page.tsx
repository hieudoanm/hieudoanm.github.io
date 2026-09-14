'use client';

import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiBank,
  PiCalendar,
  PiCards,
  PiEye,
  PiFlask,
  PiGlobeStand,
  PiMathOperations,
  PiMusicNote,
  PiPalette,
  PiUsers,
} from 'react-icons/pi';

const ITEMS = [
  {
    name: 'Maths',
    description: 'Kaprekar constant routine explorer',
    icon: PiMathOperations,
    href: '/maths/',
    group: 'STEM',
  },
  {
    name: 'Chemistry',
    description: 'Interactive periodic table of elements',
    icon: PiFlask,
    href: '/chemistry/',
    group: 'STEM',
  },
  {
    name: 'Economics',
    description: 'Game theory, markets, behavioral and macro concepts',
    icon: PiBank,
    href: '/economics/',
    group: 'Humanities',
  },
  {
    name: 'Geography',
    description: 'Countries, continents, flags and capitals',
    icon: PiGlobeStand,
    href: '/geography/',
    group: 'Humanities',
  },
  {
    name: 'History',
    description: 'Timeline and myth-vs-fact history games',
    icon: PiCalendar,
    href: '/history/',
    group: 'Humanities',
  },
  {
    name: 'Languages',
    description: 'Vocabulary decks across languages',
    icon: PiCards,
    href: '/languages/',
    group: 'Humanities',
  },
  {
    name: 'Ophthalmology',
    description: 'Vision training tools',
    icon: PiEye,
    href: '/ophthalmology/',
    group: 'Health',
  },
  {
    name: 'Psychology',
    description: 'Validated self-report assessment scales',
    icon: PiUsers,
    href: '/psychology/',
    group: 'Health',
  },
  {
    name: 'Colors',
    description: 'Tools for picking, tuning and shipping color',
    icon: PiPalette,
    href: '/colors/',
    group: 'Arts',
  },
  {
    name: 'Music',
    description: 'Piano note recognition ear-training game',
    icon: PiMusicNote,
    href: '/music/',
    group: 'Arts',
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
