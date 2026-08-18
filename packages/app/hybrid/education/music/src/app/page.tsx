'use client';

import Link from 'next/link';
import { PiMusicNote } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Pitch',
    description: 'Guess-the-note ear-training game',
    icon: PiMusicNote,
    href: '/pitch/',
  },
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="Music"
      description="Train your ear and learn music theory."
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
