import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaBook,
  FaCalculator,
  FaChessKnight,
  FaClock,
  FaEye,
  FaFlag,
  FaFlask,
  FaGithub,
  FaGoogle,
  FaImage,
  FaImages,
  FaLightbulb,
  FaPalette,
  FaPenToSquare,
  FaRobot,
  FaRulerCombined,
  FaTelegram,
  FaTextWidth,
  FaU,
  FaY,
} from 'react-icons/fa6';

const AppsPage: NextPage = () => {
  const [{ search }, setState] = useState<{ search: string }>({ search: '' });

  const apps: NothingApp[] = [
    {
      id: 'calculator',
      href: 'calculator',
      name: 'calculator',
      shortName: 'calculator',
      icon: <FaCalculator className="text-xl md:text-2xl" />,
    },
    {
      id: 'chess',
      href: 'chess',
      name: 'chess',
      shortName: 'chess',
      icon: <FaChessKnight className="text-xl md:text-2xl" />,
    },
    {
      id: 'clock',
      href: 'clock',
      name: 'clock',
      shortName: 'clock',
      icon: <FaClock className="text-xl md:text-2xl" />,
    },
    {
      id: 'colors',
      href: 'colors',
      name: 'colors',
      shortName: 'colors',
      icon: <FaPalette className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-openapi2postmanv2',
      href: 'converter/openapi2postmanv2',
      name: 'openapi2postmanv2',
      shortName: 'openapi2postmanv2',
      icon: <FaY className="text-xl md:text-2xl" />,
    },
    {
      id: 'converter-string',
      href: 'converter/string',
      name: 'string',
      shortName: 'string',
      icon: <FaTextWidth className="text-xl md:text-2xl" />,
    },
    {
      id: 'editor',
      href: 'editor',
      name: 'editor',
      shortName: 'editor',
      icon: <FaPenToSquare className="text-xl md:text-2xl" />,
    },
    {
      id: 'gen.ai',
      href: 'gen.ai',
      name: 'gen.ai',
      shortName: 'gen.ai',
      icon: <FaRobot className="text-xl md:text-2xl" />,
    },
    {
      id: 'github',
      href: 'github',
      name: 'gitHub',
      shortName: 'gh',
      icon: <FaGithub className="text-xl md:text-2xl" />,
    },
    {
      id: 'google',
      href: 'google',
      name: 'google',
      shortName: 'ggl',
      icon: <FaGoogle className="text-xl md:text-2xl" />,
    },
    {
      id: 'images',
      href: 'images',
      name: 'images',
      shortName: 'images',
      icon: <FaImages className="text-xl md:text-2xl" />,
    },
    {
      id: 'list-chemistry',
      href: 'list/chemistry',
      name: 'chemistry',
      shortName: 'chemistry',
      icon: <FaFlask className="text-xl md:text-2xl" />,
    },
    {
      id: 'list-countries',
      href: 'list/countries',
      name: 'countries',
      shortName: 'countries',
      icon: <FaFlag className="text-xl md:text-2xl" />,
    },
    {
      id: 'ocr',
      href: 'ocr',
      name: 'ocr',
      shortName: 'ocr',
      icon: <FaEye className="text-xl md:text-2xl" />,
    },
    {
      id: 'photos',
      href: 'photos',
      name: 'photos',
      shortName: 'photos',
      icon: <FaImage className="text-xl md:text-2xl" />,
    },
    {
      id: 'resolution',
      href: 'resolution',
      name: 'resolution',
      shortName: 'resolution',
      icon: <FaRulerCombined className="text-xl md:text-2xl" />,
    },
    {
      id: 'status',
      href: 'status',
      name: 'status',
      shortName: 'status',
      icon: <FaLightbulb className="text-xl md:text-2xl" />,
    },
    {
      id: 'telegram-webhook',
      href: 'telegram/webhook',
      name: 'telegram webhook',
      shortName: 'tele.hook',
      icon: <FaTelegram className="text-xl md:text-2xl" />,
    },
    {
      id: 'uuid',
      href: 'uuid',
      name: 'uuid',
      shortName: 'uuid',
      icon: <FaU className="text-xl md:text-2xl" />,
    },
    {
      id: 'words-english',
      href: 'words/english',
      name: 'english',
      shortName: 'eng',
      icon: <FaBook className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="w-full">
          <input
            id="search"
            name="search"
            placeholder="Search"
            className="w-full rounded border border-gray-300 px-4 py-2"
            value={search}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
        <div className="grid h-full grow grid-cols-4 grid-rows-5 gap-4 md:grid-cols-5 md:grid-rows-4 md:gap-8">
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
                      <div className="flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-gray-100 hover:bg-red-500 md:w-16">
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

export default AppsPage;
