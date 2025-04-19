import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaBook,
  FaCalculator,
  FaClockRotateLeft,
  FaVideo,
} from 'react-icons/fa6';

const ChessAppsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'chess-clock',
      href: 'chess/clock',
      name: 'clock',
      shortName: 'clock',
      icon: <FaClockRotateLeft className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-elo',
      href: 'chess/elo',
      name: 'elo',
      shortName: 'elo',
      icon: <FaCalculator className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-openings',
      href: 'chess/openings',
      name: 'openings',
      shortName: 'openings',
      icon: <FaBook className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess-pgn2gif',
      href: 'chess/pgn2gif',
      name: 'pgn2gif',
      shortName: 'pgn2gif',
      icon: <FaVideo className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="grid h-full grow grid-cols-1 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-1 md:gap-8">
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
