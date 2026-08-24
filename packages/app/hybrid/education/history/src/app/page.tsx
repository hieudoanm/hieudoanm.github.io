'use client';

import Link from 'next/link';
import { PiClockCountdown } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Through the Years',
    description: 'Place historical events on the timeline',
    icon: PiClockCountdown,
    href: '/through-the-years/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="History"
    description="Explore history through interactive timeline games."
    items={ITEMS}
  />
);

export default HomePage;
