'use client';

import Link from 'next/link';
import {
  PiCards,
  PiFlask,
  PiGlobe,
  PiHandWaving,
  PiMusicNote,
} from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Flashcards',
    description: 'Vocabulary decks across languages',
    icon: PiCards,
    href: '/flashcards/',
  },
  {
    label: 'Dictionary',
    description: 'English definitions, synonyms and antonyms',
    icon: PiGlobe,
    href: '/english/',
  },
  {
    label: 'Sign Language',
    description: 'Real-time hand-sign recognition',
    icon: PiHandWaving,
    href: '/sign/',
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
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      appName="Lingo"
      description="Learn languages — flashcards, dictionary and sign language."
      items={ITEMS}
    />
  );
};

export default HomePage;
