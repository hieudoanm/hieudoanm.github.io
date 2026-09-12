import type { FC } from 'react';
import Link from 'next/link';
import {
  PiBugBeetle,
  PiFeather,
  PiHandFist,
  PiMapTrifold,
} from 'react-icons/pi';

interface EightBitGame {
  name: string;
  slug: string;
  description: string;
  icon: FC<{ className?: string }>;
}

const EIGHT_BIT_GAMES: EightBitGame[] = [
  {
    name: 'Maze',
    slug: 'maze',
    description: 'Random maze with BFS solver',
    icon: PiMapTrifold,
  },
  {
    name: 'Snake',
    slug: 'snake',
    description: 'Classic snake on a 12×12 grid',
    icon: PiBugBeetle,
  },
  {
    name: 'Dino Run',
    slug: 'dino-run',
    description: 'Infinite runner',
    icon: PiFeather,
  },
  {
    name: 'Rock Paper Scissors',
    slug: 'rock-paper-scissors',
    description: 'Versus the computer',
    icon: PiHandFist,
  },
];

const EightBitCard: FC<{ game: EightBitGame }> = ({ game }) => {
  const Icon = game.icon;
  return (
    <Link
      href={`/8-bit/${game.slug}/`}
      className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
      <Icon className="text-primary mb-3 text-2xl" />
      <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
      <p className="text-base-content/50 text-xs">{game.description}</p>
    </Link>
  );
};

const EightBitPage: FC = () => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">8-Bit</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      Retro arcade classics on an 8-bit grid.
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {EIGHT_BIT_GAMES.map((game) => (
        <EightBitCard key={game.slug} game={game} />
      ))}
    </div>
  </div>
);

export default EightBitPage;
