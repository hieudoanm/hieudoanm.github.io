import { A } from '@solidjs/router';
import {
  FaSolidBook,
  FaSolidCalculator,
  FaSolidChessBoard,
  FaSolidClockRotateLeft,
  FaSolidImage,
  FaSolidVideo,
} from 'solid-icons/fa';
import { NothingApp } from '~/types';

const ChessAppsPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'chess-books-chess960',
      href: 'chess/books/chess960',
      name: 'Chess960',
      shortName: 'chess960',
      icon: <FaSolidChessBoard class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-books-openings',
      href: 'chess/books/openings',
      name: 'Openings Explorer',
      shortName: 'openings',
      icon: <FaSolidBook class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-converter-fen2png',
      href: 'chess/converter/fen2png',
      name: 'FEN to PNG',
      shortName: 'fen2png',
      icon: <FaSolidImage class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-converter-pgn2gif',
      href: 'chess/converter/pgn2gif',
      name: 'PGN to GIF',
      shortName: 'pgn2gif',
      icon: <FaSolidVideo class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-tools-elo',
      href: 'chess/tools/elo',
      name: 'Elo Calculator',
      shortName: 'elo',
      icon: <FaSolidCalculator class="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-tools-clock',
      href: 'chess/tools/clock',
      name: 'Clock',
      shortName: 'clock',
      icon: <FaSolidClockRotateLeft class="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="container mx-auto h-full p-4 md:p-8">
        <div class="grid h-full grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8">
          {apps.map(
            ({ id = '', href = '', name = '', shortName = '', icon }) => {
              return (
                <div title={id} class="col-span-1">
                  <div class="flex h-full items-center justify-center">
                    <A
                      href={`/apps/${href}`}
                      class="flex flex-col items-center gap-y-1 md:gap-y-2">
                      <div class="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500 md:w-16">
                        {icon}
                      </div>
                      <p class="w-full truncate text-center text-xs font-semibold md:text-sm">
                        <span class="inline md:hidden">{shortName}</span>
                        <span class="hidden md:inline">{name}</span>
                      </p>
                    </A>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessAppsPage;
