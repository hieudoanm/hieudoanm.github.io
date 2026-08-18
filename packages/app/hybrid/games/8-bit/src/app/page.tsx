'use client';
import Link from 'next/link';

const games = [
  {
    name: 'MAZE',
    slug: 'maze',
    description: 'RANDOM MAZE WITH BFS SOLVER',
  },
  {
    name: 'SNAKE',
    slug: 'snake',
    description: 'CLASSIC SNAKE ON 12x12 GRID',
  },
  {
    name: 'DINO RUN',
    slug: 'dino-run',
    description: 'INFINITE RUNNER',
  },
  {
    name: 'ROCK PAPER SCISSORS',
    slug: 'rock-paper-scissors',
    description: 'VS COMPUTER',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="text-primary mb-2 text-center text-lg tracking-wider">
      8-BIT GAMES
    </h1>
    <p className="text-base-content/40 mb-8 text-center text-[8px]">
      SELECT A GAME
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      {games.map((game) => (
        <Link
          key={game.slug}
          href={`/${game.slug}`}
          className="border-base-content/20 bg-base-200 hover:border-primary group block border-2 p-4 transition-colors">
          <h2 className="text-primary group-hover:text-primary-content mb-2 text-xs font-bold tracking-wider">
            {game.name}
          </h2>
          <p className="text-base-content/40 text-[8px]">{game.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
