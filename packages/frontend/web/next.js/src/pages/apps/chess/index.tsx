import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaBook,
  FaCalculator,
  FaClockRotateLeft,
  FaImage,
  FaVideo,
} from 'react-icons/fa6';

const ChessAppsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'chess-books-openings',
      href: 'chess/books/openings',
      name: 'Openings Explorer',
      shortName: 'openings',
      icon: <FaBook className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-converter-fen2png',
      href: 'chess/converter/fen2png',
      name: 'FEN to PNG',
      shortName: 'fen2png',
      icon: <FaImage className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-converter-pgn2gif',
      href: 'chess/converter/pgn2gif',
      name: 'PGN to GIF',
      shortName: 'pgn2gif',
      icon: <FaVideo className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-tools-elo',
      href: 'chess/tools/elo',
      name: 'Elo Calculator',
      shortName: 'elo',
      icon: <FaCalculator className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-tools-clock',
      href: 'chess/tools/clock',
      name: 'Clock',
      shortName: 'clock',
      icon: <FaClockRotateLeft className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="grid h-full grow grid-cols-1 grid-rows-5 gap-4 md:grid-cols-5 md:grid-rows-1 md:gap-8">
          {apps.map(({ id = '', href = '', name = '', shortName = '', icon = <>

              </> }) => {
            return (
              <div key={id} className="col-span-1 row-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={`/apps/${href}`}
                    className="flex flex-col items-center gap-y-1 md:gap-y-2">
                    <div className="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full border border-gray-800 md:w-16">
                      {icon}
                    </div>
                    <p className="w-full truncate text-center text-xs font-semibold md:text-sm">
                      <span className="inline lowercase md:hidden">
                        {shortName}
                      </span>
                      <span className="hidden md:inline">{name}</span>
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChessAppsPage;
