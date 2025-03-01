import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import { FaCamera, FaImages } from 'react-icons/fa6';

type NothingApp = {
  id: string;
  href: string;
  name: string;
  shortName: string;
  icon: JSX.Element;
};

const ImagesAppsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'images-converter-png2ico',
      href: 'images/converter/png2ico',
      name: 'PNG to ICO',
      shortName: 'png2ico',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-converter-svg2png',
      href: 'images/converter/svg2png',
      name: 'SVG to PNG',
      shortName: 'svg2png',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-golden',
      href: 'images/filter/golden',
      name: 'Filter - Golden',
      shortName: 'golden',
      icon: <FaCamera className="text-xl md:text-2xl" />,
    },
    {
      id: 'images-filter-grayscale',
      href: 'images/filter/grayscale',
      name: 'Filter - Grayscale',
      shortName: 'grayscale',
      icon: <FaCamera className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-8">
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

export default ImagesAppsPage;
