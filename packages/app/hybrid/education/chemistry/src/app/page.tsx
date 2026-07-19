'use client';

import Link from 'next/link';
import { PiAtom } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Periodic Table',
    description: 'Interactive periodic table of elements',
    icon: PiAtom,
    href: '/periodic-table/',
  },
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="Chemistry"
      description="Explore the periodic table and chemistry concepts."
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
