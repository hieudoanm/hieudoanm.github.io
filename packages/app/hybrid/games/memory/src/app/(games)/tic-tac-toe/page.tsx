import type { FC } from 'react';
import Link from 'next/link';
import {
  PiArrowUUpLeft,
  PiBird,
  PiDiceFive,
  PiGridNine,
  PiNumberThree,
  PiWarning,
} from 'react-icons/pi';

interface TicTacToeGame {
  name: string;
  slug: string;
  description: string;
  icon: FC<{ className?: string }>;
}

const TIC_TAC_TOE_GAMES: TicTacToeGame[] = [
  {
    name: 'Classic',
    slug: 'classic',
    description: 'X and O on a 3×3 grid — line up three to win.',
    icon: PiGridNine,
  },
  {
    name: 'Duck',
    slug: 'duck',
    description: 'Place your mark, then move the duck to block your opponent.',
    icon: PiBird,
  },
  {
    name: 'Notakto',
    slug: 'notakto',
    description: 'Everyone plays X — complete a row of three and you lose.',
    icon: PiWarning,
  },
  {
    name: 'Reverse',
    slug: 'reverse',
    description: 'Misere rules: avoid making three in a row at all costs.',
    icon: PiArrowUUpLeft,
  },
  {
    name: 'T3',
    slug: 't3',
    description: 'Max three marks each — the fourth erases your oldest.',
    icon: PiNumberThree,
  },
  {
    name: 'Wild',
    slug: 'wild',
    description: 'Pick X or O every turn — either mark can win you the game.',
    icon: PiDiceFive,
  },
];

const TicTacToeCard: FC<{ game: TicTacToeGame }> = ({ game }) => {
  const Icon = game.icon;
  return (
    <Link
      href={`/tic-tac-toe/${game.slug}/`}
      className="border-base-300 bg-base-200 hover:bg-base-300 block rounded-2xl border p-6 transition-colors">
      <Icon className="text-primary mb-3 text-2xl" />
      <h2 className="mb-1 text-sm font-bold">{game.name}</h2>
      <p className="text-base-content/50 text-xs">{game.description}</p>
    </Link>
  );
};

const TicTacToePage: FC = () => (
  <div className="flex flex-col items-center px-6 py-24">
    <p className="text-base-content/50 mb-6 text-xs tracking-[0.2em] uppercase">
      Games
    </p>
    <h1 className="mb-3 text-2xl font-bold">Tic-Tac-Toe</h1>
    <p className="text-base-content/50 mb-10 max-w-sm text-center text-sm">
      Six ways to play the classic grid duel.
    </p>
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {TIC_TAC_TOE_GAMES.map((game) => (
        <TicTacToeCard key={game.slug} game={game} />
      ))}
    </div>
  </div>
);

export default TicTacToePage;
