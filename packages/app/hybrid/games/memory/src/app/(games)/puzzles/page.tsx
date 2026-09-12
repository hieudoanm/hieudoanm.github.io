import type { FC } from 'react';
import Link from 'next/link';
import { PiGridFour, PiImage, PiLightbulb, PiStack } from 'react-icons/pi';

interface PuzzleGame {
  name: string;
  slug: string;
  description: string;
  icon: FC<{ className?: string }>;
}

const PUZZLE_GAMES: PuzzleGame[] = [
  {
    name: '2048',
    slug: 'game2048',
    description: 'Slide tiles and merge to reach 2048',
    icon: PiGridFour,
  },
  {
    name: 'Lights Out',
    slug: 'lights-out',
    description: 'Toggle cells to turn off every light',
    icon: PiLightbulb,
  },
  {
    name: 'Sliding Puzzle',
    slug: 'sliding-puzzle',
    description: 'Reassemble an image by sliding tiles',
    icon: PiImage,
  },
  {
    name: 'Towers',
    slug: 'towers',
    description: 'Move the whole tower to the last peg',
    icon: PiStack,
  },
];

const PuzzleCard: FC<{ game: PuzzleGame }> = ({ game }) => {
  const Icon = game.icon;
  return (
    <Link
      href={`/puzzles/${game.slug}/`}
      className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
      <Icon className="text-primary mb-3 text-2xl" />
      <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
      <p className="text-base-content/50 text-xs">{game.description}</p>
    </Link>
  );
};

const PuzzlesPage: FC = () => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">Puzzles</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      Classic brain teasers, number and logic puzzles.
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {PUZZLE_GAMES.map((game) => (
        <PuzzleCard key={game.slug} game={game} />
      ))}
    </div>
  </div>
);

export default PuzzlesPage;
