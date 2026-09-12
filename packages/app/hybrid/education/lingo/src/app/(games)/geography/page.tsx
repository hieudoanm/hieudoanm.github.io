'use client';

import { GameItem, GamesTemplate } from '@/components/templates/GamesTemplate';
import { NextPage } from 'next';
import {
  PiChartLineUp,
  PiGlobeStand,
  PiGridFour,
  PiMapPin,
  PiTextAa,
} from 'react-icons/pi';

const ITEMS: GameItem[] = [
  {
    testId: 'geography-guess',
    name: 'Guess the Country',
    description: 'Identify countries by flag, emoji or borders',
    icon: PiMapPin,
    href: '/geography/guess/',
  },
  {
    testId: 'geography-higher-or-lower',
    name: 'Higher or Lower',
    description: 'Compare country population and passport statistics',
    icon: PiChartLineUp,
    href: '/geography/higher-or-lower/',
  },
  {
    testId: 'geography-wordle',
    name: 'Country Wordle',
    description: 'Guess the daily country name in six tries',
    icon: PiTextAa,
    href: '/geography/wordle/',
  },
  {
    testId: 'geography-connections',
    name: 'Country Connections',
    description: 'Group sixteen countries into four themed sets',
    icon: PiGridFour,
    href: '/geography/connections/',
  },
  {
    testId: 'geography-sort-continents',
    name: 'Sort by Continent',
    description: 'Drag countries into their correct continent',
    icon: PiGlobeStand,
    href: '/geography/sort-continents/',
  },
];

const GeographyPage: NextPage = () => (
  <GamesTemplate
    title="Geography games"
    subtitle="Test your knowledge of countries with these games."
    items={ITEMS}
  />
);

export default GeographyPage;
