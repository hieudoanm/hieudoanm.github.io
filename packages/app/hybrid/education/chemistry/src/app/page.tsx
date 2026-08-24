'use client';

import Link from 'next/link';
import { PiAtom } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Periodic Table',
    description: 'Interactive periodic table of elements',
    icon: PiAtom,
    href: '/periodic-table/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="Chemistry"
    description="Explore the periodic table and chemistry concepts."
    items={ITEMS}
  />
);

export default HomePage;
