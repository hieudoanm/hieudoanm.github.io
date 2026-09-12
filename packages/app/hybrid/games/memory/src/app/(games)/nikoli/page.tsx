import type { FC } from 'react';
import Link from 'next/link';
import {
  PiCircle,
  PiDotsNine,
  PiGridNine,
  PiPaintBucket,
  PiRows,
  PiSquaresFour,
  PiTable,
} from 'react-icons/pi';

interface NikoliGame {
  name: string;
  slug: string;
  description: string;
  icon: FC<{ className?: string }>;
}

const NIKOLI_GAMES: NikoliGame[] = [
  {
    name: 'Sudoku',
    slug: 'sudoku',
    description: 'Fill each row, column and box with digits 1–9',
    icon: PiGridNine,
  },
  {
    name: 'Nurikabe',
    slug: 'nurikabe',
    description: 'Paint islands of white cells around each number',
    icon: PiPaintBucket,
  },
  {
    name: 'Masyu',
    slug: 'masyu',
    description: 'Draw a single loop through all pearls',
    icon: PiCircle,
  },
  {
    name: 'Shikaku',
    slug: 'shikaku',
    description: 'Divide the grid into numbered rectangles',
    icon: PiSquaresFour,
  },
  {
    name: 'Fillomino',
    slug: 'fillomino',
    description: 'Fill regions so each matches its number',
    icon: PiTable,
  },
  {
    name: 'Norinori',
    slug: 'norinori',
    description: 'Shade two cells in every domino region',
    icon: PiDotsNine,
  },
  {
    name: 'Heyawake',
    slug: 'heyawake',
    description: 'Shade rooms to match clues and avoid 2×2',
    icon: PiRows,
  },
];

const NikoliCard: FC<{ game: NikoliGame }> = ({ game }) => {
  const Icon = game.icon;
  return (
    <Link
      href={`/nikoli/${game.slug}/`}
      className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
      <Icon className="text-primary mb-3 text-2xl" />
      <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
      <p className="text-base-content/50 text-xs">{game.description}</p>
    </Link>
  );
};

const NikoliPage: FC = () => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">Nikoli</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      Classic Japanese logic puzzles, one grid at a time.
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {NIKOLI_GAMES.map((game) => (
        <NikoliCard key={game.slug} game={game} />
      ))}
    </div>
  </div>
);

export default NikoliPage;
