'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import { PiCalendar, PiClock } from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'history-myth-vs-fact',
    name: 'Myth vs Fact',
    description: 'Separate historical myths from facts',
    icon: PiCalendar,
    href: '/history/myth-vs-fact/',
  },
  {
    testId: 'history-through-the-years',
    name: 'Through the Years',
    description: 'Place historical events on a timeline',
    icon: PiClock,
    href: '/history/through-the-years/',
  },
];

const HistoryPage: NextPage = () => (
  <GamesTemplate
    title="History games"
    subtitle="Test your historical knowledge with these games."
    items={ITEMS}
  />
);

export default HistoryPage;
