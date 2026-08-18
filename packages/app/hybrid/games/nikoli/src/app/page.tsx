'use client';
import Link from 'next/link';

const games = [
  {
    name: 'Sudoku',
    slug: 'sudoku',
    description:
      'Fill a 9×9 grid so each row, column, and 3×3 box contains digits 1–9.',
  },
  {
    name: 'Nurikabe',
    slug: 'nurikabe',
    description:
      'Paint cells black to form a single connected stream, leaving numbered islands.',
  },
  {
    name: 'Masyu',
    slug: 'masyu',
    description:
      'Draw a single loop through all pearls, turning at black and going straight through white.',
  },
  {
    name: 'Shikaku',
    slug: 'shikaku',
    description:
      'Divide the grid into rectangles, each containing exactly one numbered cell.',
  },
  {
    name: 'Fillomino',
    slug: 'fillomino',
    description:
      "Fill the grid with polyominoes where each region's size equals its number.",
  },
  {
    name: 'Norinori',
    slug: 'norinori',
    description: 'Shade exactly two cells in each domino-shaped region.',
  },
  {
    name: 'Heyawake',
    slug: 'heyawake',
    description:
      'Shade cells following numbered room constraints and the no-three-in-a-row rule.',
  },
] as const;

const HomePage = () => (
  <div className="mx-auto max-w-3xl p-6">
    <h1 className="mb-6 text-center text-3xl font-bold">Nikoli Puzzles</h1>
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
