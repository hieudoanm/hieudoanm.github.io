import { addZero } from '@web/utils/number';
import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaDumbbell, FaPlay, FaRobot } from 'react-icons/fa6';

type Bookmark = {
  id: string;
  icon: ReactNode;
  group: string;
  name: string;
  href: string;
};

const ChessBookmarks: NextPage = () => {
  const bookmarks: Bookmark[] = [
    {
      id: 'chess.com',
      icon: <FaPlay />,
      group: 'Play Online',
      name: 'chess.com',
      href: 'https://chess.com',
    },
    {
      id: 'lichess.org',
      icon: <FaPlay />,
      group: 'Play Online',
      name: 'lichess.org',
      href: 'https://lichess.org',
    },
    {
      id: 'puzzles',
      icon: <FaDumbbell />,
      group: 'Practices',
      name: 'chess.com Puzzles',
      href: 'https://chess.com/puzzles',
    },
    {
      id: 'openings',
      icon: <FaDumbbell />,
      group: 'Practices',
      name: 'lichess.org Openings',
      href: 'https://lichess.org/opening',
    },
    {
      id: 'training',
      icon: <FaDumbbell />,
      group: 'Practices',
      name: 'lichess.org Training',
      href: 'https://lichess.org/training',
    },
    {
      id: 'endgames',
      icon: <FaDumbbell />,
      group: 'Practices',
      name: 'Tablebases',
      href: 'https://syzygy-tables.info/',
    },
    {
      id: 'alpha',
      icon: <FaRobot />,
      group: 'Engine',
      name: 'AlphaZero',
      href: 'https://deepmind.google/discover/blog/alphazero-shedding-new-light-on-chess-shogi-and-go/',
    },
    {
      id: 'stockfish',
      icon: <FaRobot />,
      group: 'Engine',
      name: 'Stockfish',
      href: 'https://stockfishchess.org/',
    },
    {
      id: 'leela',
      icon: <FaRobot />,
      group: 'Engine',
      name: 'LeelaZero',
      href: 'https://lczero.org/',
    },
    {
      id: 'komodo',
      icon: <FaRobot />,
      group: 'Engine',
      name: 'Komodo',
      href: 'https://komodochess.com/',
    },
  ];

  return (
    <div className="container mx-auto px-8">
      <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-y-4 py-4 md:gap-y-8 md:py-8">
        <h1 className="text-2xl md:text-4xl">Bookmarks</h1>
        <div className="flex w-full flex-col gap-y-2 rounded bg-gray-900 p-4 text-red-500">
          {bookmarks.map(
            (
              { id = '', icon, group = '', name = '', href = '' },
              index: number
            ) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-2">
                    <span>{icon}</span>
                    <p>
                      {addZero(index + 1)}.{group}
                    </p>
                  </div>
                  <p className="truncate">
                    <Link
                      href={href}
                      target="_blank"
                      className="underline decoration-dotted underline-offset-4">
                      {name}
                    </Link>
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default ChessBookmarks;
