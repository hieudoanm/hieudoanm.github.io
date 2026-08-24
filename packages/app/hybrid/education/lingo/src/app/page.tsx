'use client';

import Link from 'next/link';
import { PiCards, PiGlobe, PiHandWaving } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
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
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="Lingo"
      description="Learn languages — flashcards, dictionary and sign language."
      items={ITEMS}
      stats={{ xp: progress.xp, streak: progress.streak }}
      footer={
        <>
          <Link href="/about/">About</Link>
          <Link href="/downloads/">Downloads</Link>
          <Link href="/version/">Version</Link>
        </>
      }
    />
  );
};

export default HomePage;
