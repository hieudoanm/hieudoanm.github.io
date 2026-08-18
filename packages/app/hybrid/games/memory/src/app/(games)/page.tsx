'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { PiMemory } from 'react-icons/pi';

interface Game {
  name: string;
  slug: string;
  description: string;
}

const GAMES: Game[] = [
  {
    name: 'Memory Match',
    slug: 'memory-match',
    description: 'Emoji card pairing grid',
  },
  { name: 'Pi', slug: 'pi', description: 'Pi digit memorization' },
  {
    name: 'N-Back',
    slug: 'n-back',
    description: 'Spatial n-back cognitive test',
  },
  { name: 'Recall', slug: 'recall', description: 'Number flash memorization' },
];

const GameCard: FC<{ game: Game }> = ({ game }) => (
  <Link
    href={`/${game.slug}/`}
    className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
    <PiMemory className="text-primary mb-3 text-2xl" />
    <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
    <p className="text-base-content/50 text-xs">{game.description}</p>
  </Link>
);

const HomePage: FC = () => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">Memory Games</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      Train your brain with memory and cognitive challenges.
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {GAMES.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  </div>
);

export default HomePage;
