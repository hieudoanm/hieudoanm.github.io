'use client';

import Link from 'next/link';
import { PiHamburger } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Food Randomizer',
    description: 'Spin the reel to pick what to eat today',
    icon: PiHamburger,
    href: '/randomizer/',
  },
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="Foody"
      description="Can't decide what to eat? Spin the reel and let fate choose."
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
