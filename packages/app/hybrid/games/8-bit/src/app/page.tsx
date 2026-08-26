'use client';
import Link from 'next/link';

const games = [
  {
    name: 'Maze',
    slug: 'maze',
    description:
      'Generate a random perfect maze and solve it with BFS pathfinding.',
  },
  {
    name: 'Snake',
    slug: 'snake',
    description:
      'Classic snake on a 12×12 grid. Eat food, grow longer, avoid walls.',
  },
  {
    name: 'DinoRun',
    slug: 'dino-run',
    description:
      'Infinite runner — jump over cacti, rocks, and birds as speed increases.',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="mb-6 text-center text-3xl font-bold">8-Bit Games</h1>
    <div className="grid gap-4 sm:grid-cols-2">
      {games.map((game) => (
        <Link
          key={game.slug}
          href={`/${game.slug}`}
          className="card bg-base-200 shadow-sm transition-shadow hover:shadow-md">
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
