'use client';
import Link from 'next/link';

const games = [
  {
    name: 'Classic',
    slug: 'classic',
    description: 'X and O on a 3×3 grid — line up three to win.',
  },
  {
    name: 'Duck',
    slug: 'duck',
    description: 'Place your mark, then move the duck to block your opponent.',
  },
  {
    name: 'Notakto',
    slug: 'notakto',
    description: 'Everyone plays X — complete a row of three and you lose.',
  },
  {
    name: 'Reverse',
    slug: 'reverse',
    description: 'Misere rules: avoid making three in a row at all costs.',
  },
  {
    name: 'T3',
    slug: 't3',
    description: 'Max three marks each — the fourth erases your oldest.',
  },
  {
    name: 'Wild',
    slug: 'wild',
    description: 'Pick X or O every turn — either mark can win you the game.',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="mb-6 text-center text-3xl font-bold">
      Tic-Tac-Toe Variants
    </h1>
    <div className="grid gap-4 sm:grid-cols-2">
      {games.map((game) => (
        <Link
          key={game.slug}
          href={`/${game.slug}`}
          className="card bg-base-200 shadow-sm transition-shadow hover:shadow-md"
          data-testid={`open-${game.slug}`}>
          <div className="card-body">
            <h2 className="card-title text-lg">{game.name}</h2>
            <p className="text-base-content/70 text-sm">{game.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
