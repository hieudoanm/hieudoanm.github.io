'use client';

import Link from 'next/link';
import { PiStrategy } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: "Prisoner's Dilemma",
    description: 'Iterated game theory against AI strategies',
    icon: PiStrategy,
    href: '/prisoners-dilemma/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="Economics"
    description="Explore game theory and economic concepts."
    items={ITEMS}
  />
);

export default HomePage;
