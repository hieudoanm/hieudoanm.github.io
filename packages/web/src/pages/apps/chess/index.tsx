import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import {
  FaBook,
  FaCalculator,
  FaChessBoard,
  FaClockRotateLeft,
  FaImage,
  FaVideo,
} from 'react-icons/fa6';

type NothingApp = {
  id: string;
  href: string;
  name: string;
  shortName: string;
  icon: JSX.Element;
};

const ChessAppsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'chess-books-chess960',
      href: 'chess/books/chess960',
      name: 'Chess960',
      shortName: 'chess960',
      icon: <FaChessBoard className="text-xl md:text-2xl" />,
    },
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
    <div className="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8">
          {apps.map(
            ({ id = '', href = '', name = '', shortName = '', icon }) => {
              return (
                <div key={id} className="col-span-1">
                  <div className="flex h-full items-center justify-center">
                    <Link
                      href={`/apps/${href}`}
                      className="flex flex-col items-center gap-y-1 md:gap-y-2">
                      <div className="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500 md:w-16">
                        {icon}
                      </div>
                      <p className="w-full truncate text-center text-xs font-semibold md:text-sm">
                        <span className="inline md:hidden">{shortName}</span>
                        <span className="hidden md:inline">{name}</span>
                      </p>
                    </Link>
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
