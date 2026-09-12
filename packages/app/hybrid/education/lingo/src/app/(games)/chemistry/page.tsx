'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiFlask } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    name: 'Periodic Table',
    description: 'Interactive periodic table of elements',
    icon: PiFlask,
    href: '/chemistry/periodic-table/',
  },
];

const ChemistryPage: NextPage = () => (
  <GamesTemplate
    title="Chemistry"
    subtitle="Build and explore the periodic table of elements."
    items={ITEMS}
  />
);

export default ChemistryPage;
