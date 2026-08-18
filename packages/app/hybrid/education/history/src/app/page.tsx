'use client';

import Link from 'next/link';
import { PiCheckCircle, PiClockCountdown } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { useProgress } from '@/hooks/useProgress';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Through the Years',
    description: 'Place historical events on the timeline',
    icon: PiClockCountdown,
    href: '/through-the-years/',
  },
  {
    label: 'Myth vs Fact',
    description: 'Spot the false claim',
    icon: PiCheckCircle,
    href: '/myth-vs-fact/',
  },
];

const HomePage: NextPage = () => {
  const { progress } = useProgress();
  return (
    <HomeTemplate
      appName="History"
      description="Explore history through interactive timeline games."
      items={ITEMS}
      stats={{ xp: progress.xp, streak: progress.streak }}
    />
  );
};

export default HomePage;
