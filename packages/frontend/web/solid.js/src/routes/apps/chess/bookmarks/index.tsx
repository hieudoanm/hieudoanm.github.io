import { A } from '@solidjs/router';
import { FaSolidDumbbell, FaSolidPlay, FaSolidRobot } from 'solid-icons/fa';
import { JSX } from 'solid-js';
import { addZero } from '~/utils/number';

type Bookmark = {
  id: string;
  icon: JSX.Element;
  group: string;
  name: string;
  href: string;
};

const ChessBookmarks = () => {
  const bookmarks: Bookmark[] = [
    {
      id: 'chess.com',
      icon: <FaSolidPlay />,
      group: 'Play Online',
      name: 'chess.com',
      href: 'https://chess.com',
    },
    {
      id: 'lichess.org',
      icon: <FaSolidPlay />,
      group: 'Play Online',
      name: 'lichess.org',
      href: 'https://lichess.org',
    },
    {
      id: 'puzzles',
      icon: <FaSolidDumbbell />,
      group: 'Practices',
      name: 'chess.com Puzzles',
      href: 'https://chess.com/puzzles',
    },
    {
      id: 'openings',
      icon: <FaSolidDumbbell />,
      group: 'Practices',
      name: 'lichess.org Openings',
      href: 'https://lichess.org/opening',
    },
    {
      id: 'training',
      icon: <FaSolidDumbbell />,
      group: 'Practices',
      name: 'lichess.org Training',
      href: 'https://lichess.org/training',
    },
    {
      id: 'endgames',
      icon: <FaSolidDumbbell />,
      group: 'Practices',
      name: 'Tablebases',
      href: 'https://syzygy-tables.info/',
    },
    {
      id: 'alpha',
      icon: <FaSolidRobot />,
      group: 'Engine',
      name: 'AlphaZero',
      href: 'https://deepmind.google/discover/blog/alphazero-shedding-new-light-on-chess-shogi-and-go/',
    },
    {
      id: 'stockfish',
      icon: <FaSolidRobot />,
      group: 'Engine',
      name: 'Stockfish',
      href: 'https://stockfishchess.org/',
    },
    {
      id: 'leela',
      icon: <FaSolidRobot />,
      group: 'Engine',
      name: 'LeelaZero',
      href: 'https://lczero.org/',
    },
    {
      id: 'komodo',
      icon: <FaSolidRobot />,
      group: 'Engine',
      name: 'Komodo',
      href: 'https://komodochess.com/',
    },
  ];

  return (
    <div class="container mx-auto px-8">
      <div class="mx-auto flex h-full max-w-md flex-col items-center justify-center gap-y-4 py-4 md:gap-y-8 md:py-8">
        <h1 class="text-2xl md:text-4xl">Bookmarks</h1>
        <div class="flex w-full flex-col gap-y-2 rounded bg-gray-900 p-4 text-red-500">
          {bookmarks.map(
            (
              { id = '', icon, group = '', name = '', href = '' },
              index: number
            ) => {
              return (
                <div
                  title={id}
                  class="flex items-center justify-between gap-x-2">
                  <div class="flex items-center gap-x-2">
                    <span>{icon}</span>
                    <p>
                      {addZero(index + 1)}.{group}
                    </p>
                  </div>
                  <p class="truncate">
                    <A
                      href={href}
                      target="_blank"
                      class="underline decoration-dotted underline-offset-4">
                      {name}
                    </A>
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
