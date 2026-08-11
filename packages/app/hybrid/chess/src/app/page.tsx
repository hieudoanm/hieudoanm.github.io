import { FC } from 'react';
import Link from 'next/link';

const tools: { href: string; title: string; description: string }[] = [
  {
    href: '/board',
    title: 'Chess Board',
    description: 'Explore positions, Chess960, openings, Stockfish and export',
  },
  {
    href: '/clock',
    title: 'Chess Clock',
    description: 'Classic, Fischer, Bronstein, hourglass and delay presets',
  },
  {
    href: '/elo',
    title: 'Chess Elo',
    description: 'Rating change and performance rating calculators',
  },
  {
    href: '/stats',
    title: 'Chess Stats',
    description: 'Compare Chess.com stats against titled players',
  },
  {
    href: '/review',
    title: 'Game Review',
    description: 'Analyze a PGN with engine accuracy and missed mates',
  },
  {
    href: '/library',
    title: 'Game Library',
    description: 'Store, search and share games, with an opening explorer',
  },
  {
    href: '/trainer',
    title: 'Trainer',
    description: 'Tactics, endgames, mates, openings, coordinates and variants',
  },
  {
    href: '/pairing',
    title: 'Pairing',
    description: 'Round-robin and Swiss pairings with tiebreaks',
  },
];

const HomePage: FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold">Chess</h1>
      <p className="text-base-content/70 mt-2">A minimal chess toolbox</p>
    </div>
    <nav className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {tools.map(({ href, title, description }) => (
        <Link
          key={href}
          href={href}
          className="card bg-base-200 border-base-300 hover:border-primary border transition-colors">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className="text-base-content/70 text-sm">{description}</p>
          </div>
        </Link>
      ))}
    </nav>
  </div>
);

export default HomePage;
