'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiEye } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'ophthalmology-vision',
    name: 'Vision',
    description: 'Visual acuity theory and the three testing charts',
    icon: PiEye,
    href: '/ophthalmology/vision/',
  },
];

const OphthalmologyPage: NextPage = () => (
  <GamesTemplate
    title="Ophthalmology"
    subtitle="Visual acuity screening — Snellen, LogMAR and Tumbling E."
    items={ITEMS}
  />
);

export default OphthalmologyPage;
