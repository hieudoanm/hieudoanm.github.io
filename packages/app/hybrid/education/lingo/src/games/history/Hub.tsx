import Link from 'next/link';
import { FC } from 'react';
import { PiCalendar, PiClock } from 'react-icons/pi';

const GAMES = [
  {
    testId: 'myth-vs-fact',
    label: 'Myth vs Fact',
    description: 'Separate historical myths from facts',
    icon: PiCalendar,
    href: '/history/myth-vs-fact/',
  },
  {
    testId: 'through-the-years',
    label: 'Through the Years',
    description: 'Place historical events on a timeline',
    icon: PiClock,
    href: '/history/through-the-years/',
  },
];

export const HistoryGames: FC = () => (
  <div className="mx-auto w-full max-w-3xl">
    <div className="mb-6 text-center">
      <h1 className="text-primary text-3xl font-bold tracking-tight">
        History games
      </h1>
      <p className="text-base-content/60 mt-2 text-sm">
        Test your historical knowledge with these games.
      </p>
    </div>
    <div className="bg-base-100 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {GAMES.map(({ testId, label, description, icon: Icon, href }) => (
        <Link
          key={href}
          href={href}
          data-testid={`history-${testId}`}
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
HistoryGames.displayName = 'HistoryGames';
