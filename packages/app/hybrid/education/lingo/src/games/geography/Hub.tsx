import Link from 'next/link';
import { FC } from 'react';
import {
  PiChartLineUp,
  PiGlobeStand,
  PiGridFour,
  PiMapPin,
  PiTextAa,
} from 'react-icons/pi';

const GAMES = [
  {
    testId: 'guess',
    label: 'Guess the Country',
    description: 'Identify countries by flag, emoji or borders',
    icon: PiMapPin,
    href: '/geography/guess/',
  },
  {
    testId: 'higher-or-lower',
    label: 'Higher or Lower',
    description: 'Compare country population and passport statistics',
    icon: PiChartLineUp,
    href: '/geography/higher-or-lower/',
  },
  {
    testId: 'wordle',
    label: 'Country Wordle',
    description: 'Guess the daily country name in six tries',
    icon: PiTextAa,
    href: '/geography/wordle/',
  },
  {
    testId: 'connections',
    label: 'Country Connections',
    description: 'Group sixteen countries into four themed sets',
    icon: PiGridFour,
    href: '/geography/connections/',
  },
  {
    testId: 'sort-continents',
    label: 'Sort by Continent',
    description: 'Drag countries into their correct continent',
    icon: PiGlobeStand,
    href: '/geography/sort-continents/',
  },
];

export const GeographyGames: FC = () => (
  <div className="mx-auto w-full max-w-3xl">
    <div className="mb-6 text-center">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        Geography games
      </h1>
      <p className="text-base-content/60 mt-2 text-sm">
        Test your knowledge of countries with these games.
      </p>
    </div>
    <div className="bg-base-100 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {GAMES.map(({ testId, label, description, icon: Icon, href }) => (
        <Link
          key={href}
          href={href}
          data-testid={`geography-${testId}`}
          className="card bg-base-100 border-base-300 hover:border-primary flex h-full flex-col items-center gap-2 border px-4 py-5 text-center transition-colors">
          <span className="bg-base-200 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
            <Icon className="text-primary text-2xl" />
          </span>
          <span className="font-bold">{label}</span>
          <span className="text-base-content/60 text-xs">{description}</span>
        </Link>
      ))}
    </div>
  </div>
);
GeographyGames.displayName = 'GeographyGames';
