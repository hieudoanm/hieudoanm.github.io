'use client';

import Link from 'next/link';
import { PiStrategy } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: "Prisoner's Dilemma",
    description: 'Iterated game theory against AI strategies',
    icon: PiStrategy,
    href: '/prisoners-dilemma/',
  },
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="Economics"
      description="Explore game theory and economic concepts."
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
