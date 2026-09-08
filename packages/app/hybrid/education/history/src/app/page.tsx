'use client';

import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiCheckCircle, PiClockCountdown } from 'react-icons/pi';

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
  return (
    <HomeTemplate
      appName="History"
      description="Explore history through interactive timeline games."
      items={ITEMS}
    />
  );
};

export default HomePage;
