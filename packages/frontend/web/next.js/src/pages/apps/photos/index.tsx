import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaImages, FaInstagram, FaWindowRestore } from 'react-icons/fa6';

const PhotosAppsPage: NextPage = () => {
  const [{ search }, setState] = useState<{ search: string }>({ search: '' });

  const apps: NothingApp[] = [
    {
      id: 'photos-converter',
      href: 'photos/converter',
      name: 'converter',
      shortName: 'converter',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos-gallery',
      href: 'photos/gallery',
      name: 'gallery',
      shortName: 'gallery',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos-github-cover',
      href: 'photos/github/cover',
      name: 'github.cover',
      shortName: 'gh.cover',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos-github-languages',
      href: 'photos/github/languages',
      name: 'github.languages',
      shortName: 'gh.lang',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos-instagram',
      href: 'photos/instagram',
      name: 'instagram',
      shortName: 'insta',
      icon: <FaInstagram className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos-widgets',
      href: 'photos/widgets',
      name: 'widgets',
      shortName: 'widgets',
      icon: <FaWindowRestore className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="w-full">
          <input
            id="search"
            name="search"
            placeholder="Search"
            className="w-full rounded border border-gray-700 px-4 py-2 focus:outline-none"
            value={search}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
        <div className="grid h-full grow grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8">
          {apps
            .filter(({ name, shortName }) => {
              return search !== ''
                ? name.toLowerCase().includes(search.toLowerCase()) ||
                    shortName.toLowerCase().includes(search.toLowerCase())
                : true;
            })
            .map(({ id = '', href = '', name = '', shortName = '', icon = <>

                </> }) => {
              return (
                <div key={id} className="col-span-1 row-span-1">
                  <div className="flex h-full items-center justify-center">
                    <Link
                      href={`/apps/${href}`}
                      className="flex flex-col items-center gap-y-1 md:gap-y-2">
                      <div className="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-900 hover:bg-red-500 hover:text-gray-100 md:w-16">
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

export default PhotosAppsPage;
