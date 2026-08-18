'use client';

import { PiArrowsOutCardinal, PiChartLine, PiEye } from 'react-icons/pi';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { NextPage } from 'next';

const ITEMS = [
  {
    label: 'Snellen',
    description: 'Classic letter chart (20/200 → 20/10)',
    icon: PiEye,
    href: '/snellen/',
  },
  {
    label: 'LogMAR',
    description: 'Scored lines with per-letter scoring',
    icon: PiChartLine,
    href: '/logmar/',
  },
  {
    label: 'Tumbling E',
    description: 'Direction-based chart for non-readers',
    icon: PiArrowsOutCardinal,
    href: '/tumbling-e/',
  },
];

const HomePage: NextPage = () => (
  <HomeTemplate
    appName="Eyes"
    description="Visual acuity charts for vision screening — Snellen, LogMAR and Tumbling E."
    items={ITEMS}
  />
);

export default HomePage;
