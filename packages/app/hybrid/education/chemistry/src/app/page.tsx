'use client';

import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';
import { PiAtom } from 'react-icons/pi';

const ITEMS = [
  {
    label: 'Periodic Table',
    description: 'Interactive periodic table of elements',
    icon: PiAtom,
    href: '/periodic-table/',
  },
];

const HomePage: NextPage = () => {
  return (
    <HomeTemplate
      appName="Chemistry"
      description="Explore the periodic table and chemistry concepts."
      items={ITEMS}
    />
  );
};

export default HomePage;
