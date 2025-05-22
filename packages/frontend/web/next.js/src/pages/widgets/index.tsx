import { NothingApp } from '@web/types';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaBus,
  FaCalculator,
  FaCalendarDays,
  FaCamera,
  FaChartLine,
  FaClock,
  FaCloudSunRain,
  FaCompass,
  FaEnvelopesBulk,
  FaFileLines,
  FaFileZipper,
  FaFirefoxBrowser,
  FaFutbol,
  FaGamepad,
  FaGear,
  FaHeart,
  FaHouseChimney,
  FaImages,
  FaLanguage,
  FaMapLocationDot,
  FaMessage,
  FaMobile,
  FaMusic,
  FaNewspaper,
  FaPalette,
  FaPhone,
  FaRectangleList,
  FaTemperatureFull,
  FaWallet,
  FaYoutube,
} from 'react-icons/fa6';

const WidgetsPage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'browser',
      href: 'browser',
      name: 'browser',
      shortName: 'browser',
      icon: <FaFirefoxBrowser className="text-2xl" />,
    },
    {
      id: 'calendar',
      href: 'calendar',
      name: 'calendar',
      shortName: 'calendar',
      icon: <FaCalendarDays className="text-2xl" />,
    },
    {
      id: 'calculator',
      href: 'calculator',
      name: 'calculator',
      shortName: 'calculator',
      icon: <FaCalculator className="text-2xl" />,
    },
    {
      id: 'camera',
      href: 'camera',
      name: 'camera',
      shortName: 'camera',
      icon: <FaCamera className="mx-auto text-2xl" />,
    },
    {
      id: 'clock',
      href: 'clock',
      name: 'clock',
      shortName: 'clock',
      icon: <FaClock className="text-2xl" />,
    },
    {
      id: 'colors',
      href: 'colors',
      name: 'colors',
      shortName: 'colors',
      icon: <FaPalette className="text-2xl" />,
    },
    {
      id: 'compass',
      href: 'compass',
      name: 'compass',
      shortName: 'compass',
      icon: <FaCompass className="text-2xl" />,
    },
    {
      id: 'devices',
      href: 'devices',
      name: 'devices',
      shortName: 'devices',
      icon: <FaMobile className="text-2xl" />,
    },
    {
      id: 'files',
      href: 'files',
      name: 'files',
      shortName: 'files',
      icon: <FaFileZipper className="text-2xl" />,
    },
    {
      id: 'fitness',
      href: 'fitness',
      name: 'fitness',
      shortName: 'fitness',
      icon: <FaHeart className="text-2xl" />,
    },
    {
      id: 'games',
      href: 'games',
      name: 'games',
      shortName: 'games',
      icon: <FaGamepad className="text-2xl" />,
    },
    {
      id: 'health',
      href: 'health',
      name: 'health',
      shortName: 'health',
      icon: <FaTemperatureFull className="text-2xl" />,
    },
    {
      id: 'home',
      href: 'home',
      name: 'home',
      shortName: 'home',
      icon: <FaHouseChimney className="text-2xl" />,
    },
    {
      id: 'mail',
      href: 'mail',
      name: 'mail',
      shortName: 'mail',
      icon: <FaEnvelopesBulk className="text-2xl" />,
    },
    {
      id: 'maps',
      href: 'maps',
      name: 'maps',
      shortName: 'maps',
      icon: <FaMapLocationDot className="text-2xl" />,
    },
    {
      id: 'messages',
      href: 'messages',
      name: 'messages',
      shortName: 'messages',
      icon: <FaMessage className="text-2xl" />,
    },
    {
      id: 'music',
      href: 'music',
      name: 'music',
      shortName: 'music',
      icon: <FaMusic className="text-2xl" />,
    },
    {
      id: 'news',
      href: 'news',
      name: 'news',
      shortName: 'news',
      icon: <FaNewspaper className="text-2xl" />,
    },
    {
      id: 'notes',
      href: 'notes',
      name: 'notes',
      shortName: 'notes',
      icon: <FaFileLines className="text-2xl" />,
    },
    {
      id: 'phone',
      href: 'phone',
      name: 'phone',
      shortName: 'phone',
      icon: <FaPhone className="text-2xl" />,
    },
    {
      id: 'photos',
      href: 'photos',
      name: 'photos',
      shortName: 'photos',
      icon: <FaImages className="mx-auto text-2xl" />,
    },
    {
      id: 'settings',
      href: 'settings',
      name: 'settings',
      shortName: 'settings',
      icon: <FaGear className="text-2xl" />,
    },
    {
      id: 'sports',
      href: 'sports',
      name: 'sports',
      shortName: 'sports',
      icon: <FaFutbol className="text-2xl" />,
    },
    {
      id: 'stock',
      href: 'stock',
      name: 'stock',
      shortName: 'stock',
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      id: 'tasks',
      href: 'tasks',
      name: 'tasks',
      shortName: 'tasks',
      icon: <FaRectangleList className="text-2xl" />,
    },
    {
      id: 'translate',
      href: 'translate',
      name: 'translate',
      shortName: 'translate',
      icon: <FaLanguage className="text-2xl" />,
    },
    {
      id: 'transportation',
      href: 'transportation',
      name: 'transportation',
      shortName: 'transportation',
      icon: <FaBus className="text-2xl" />,
    },
    {
      id: 'videos',
      href: 'videos',
      name: 'videos',
      shortName: 'videos',
      icon: <FaYoutube className="text-2xl" />,
    },
    {
      id: 'wallet',
      href: 'wallet',
      name: 'wallet',
      shortName: 'wallet',
      icon: <FaWallet className="text-2xl" />,
    },
    {
      id: 'weather',
      href: 'weather',
      name: 'weather',
      shortName: 'weather',
      icon: <FaCloudSunRain className="text-2xl" />,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden md:h-screen">
      <div className="container mx-auto flex h-full flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        <div className="grid h-full grid-cols-4 grid-rows-8 gap-4 md:grid-cols-8 md:grid-rows-4 md:gap-8">
          {apps.map(({ id = '', href = '', name = '', shortName = '', icon = <>

              </> }) => {
            return (
              <div key={id} className="col-span-1 row-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={`/widgets/${href}`}
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

export default WidgetsPage;
