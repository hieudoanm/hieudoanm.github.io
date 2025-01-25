import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import {
  FaBatteryFull,
  FaBitcoin,
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
  FaLanguage,
  FaMapLocationDot,
  FaMessage,
  FaMobile,
  FaMusic,
  FaNewspaper,
  FaPalette,
  FaPhone,
  FaPhotoFilm,
  FaRectangleList,
  FaTemperatureFull,
  FaWallet,
  FaYoutube,
} from 'react-icons/fa6';

type NothingApp = {
  id: string;
  href: string;
  name: string;
  icon: JSX.Element;
};

const HomePage: NextPage = () => {
  const apps: NothingApp[] = [
    {
      id: 'battery',
      href: 'battery',
      name: 'battery',
      icon: <FaBatteryFull className="text-2xl" />,
    },
    {
      id: 'browser',
      href: 'browser',
      name: 'browser',
      icon: <FaFirefoxBrowser className="text-2xl" />,
    },
    {
      id: 'calculator',
      href: 'calculator',
      name: 'calculator',
      icon: <FaCalculator className="text-2xl" />,
    },
    {
      id: 'calendar',
      href: 'calendar',
      name: 'calendar',
      icon: <FaCalendarDays className="text-2xl" />,
    },
    {
      id: 'camera',
      href: 'camera',
      name: 'camera',
      icon: <FaCamera className="mx-auto text-2xl" />,
    },
    {
      id: 'clock',
      href: 'clock',
      name: 'clock',
      icon: <FaClock className="text-2xl" />,
    },
    {
      id: 'colors',
      href: 'colors',
      name: 'colors',
      icon: <FaPalette className="text-2xl" />,
    },
    {
      id: 'compass',
      href: 'compass',
      name: 'compass',
      icon: <FaCompass className="text-2xl" />,
    },
    {
      id: 'crypto',
      href: 'crypto',
      name: 'crypto',
      icon: <FaBitcoin className="text-2xl" />,
    },
    {
      id: 'devices',
      href: 'devices',
      name: 'devices',
      icon: <FaMobile className="text-2xl" />,
    },
    {
      id: 'files',
      href: 'files',
      name: 'files',
      icon: <FaFileZipper className="text-2xl" />,
    },
    {
      id: 'fitness',
      href: 'fitness',
      name: 'fitness',
      icon: <FaHeart className="text-2xl" />,
    },
    {
      id: 'games',
      href: 'games',
      name: 'games',
      icon: <FaGamepad className="text-2xl" />,
    },
    {
      id: 'health',
      href: 'health',
      name: 'health',
      icon: <FaTemperatureFull className="text-2xl" />,
    },
    {
      id: 'home',
      href: 'home',
      name: 'home',
      icon: <FaHouseChimney className="text-2xl" />,
    },
    {
      id: 'mail',
      href: 'mail',
      name: 'mail',
      icon: <FaEnvelopesBulk className="text-2xl" />,
    },
    {
      id: 'maps',
      href: 'maps',
      name: 'maps',
      icon: <FaMapLocationDot className="text-2xl" />,
    },
    {
      id: 'messages',
      href: 'messages',
      name: 'messages',
      icon: <FaMessage className="text-2xl" />,
    },
    {
      id: 'music',
      href: 'music',
      name: 'music',
      icon: <FaMusic className="text-2xl" />,
    },
    {
      id: 'news',
      href: 'news',
      name: 'news',
      icon: <FaNewspaper className="text-2xl" />,
    },
    {
      id: 'notes',
      href: 'notes',
      name: 'notes',
      icon: <FaFileLines className="text-2xl" />,
    },
    {
      id: 'phone',
      href: 'phone',
      name: 'phone',
      icon: <FaPhone className="text-2xl" />,
    },
    {
      id: 'photos',
      href: 'photos',
      name: 'photos',
      icon: <FaPhotoFilm className="text-2xl" />,
    },
    {
      id: 'settings',
      href: 'settings',
      name: 'settings',
      icon: <FaGear className="text-2xl" />,
    },
    {
      id: 'sports',
      href: 'sports',
      name: 'sports',
      icon: <FaFutbol className="text-2xl" />,
    },
    {
      id: 'stocks',
      href: 'stocks',
      name: 'stocks',
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      id: 'tasks',
      href: 'tasks',
      name: 'tasks',
      icon: <FaRectangleList className="text-2xl" />,
    },
    {
      id: 'translate',
      href: 'translate',
      name: 'translate',
      icon: <FaLanguage className="text-2xl" />,
    },
    {
      id: 'transportation',
      href: 'transportation',
      name: 'transportation',
      icon: <FaBus className="text-2xl" />,
    },
    {
      id: 'videos',
      href: 'videos',
      name: 'videos',
      icon: <FaYoutube className="text-2xl" />,
    },
    {
      id: 'wallet',
      href: 'wallet',
      name: 'wallet',
      icon: <FaWallet className="text-2xl" />,
    },
    {
      id: 'weather',
      href: 'weather',
      name: 'weather',
      icon: <FaCloudSunRain className="text-2xl" />,
    },
  ];

  return (
    <div className="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-4 grid-rows-8 gap-4 md:grid-cols-8 md:grid-rows-4 md:gap-8">
          {apps.map(({ id, href, name, icon }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={`/${href}`}
                    className="flex flex-col items-center gap-y-1">
                    <div className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-black text-white hover:bg-red-500">
                      {icon}
                    </div>
                    <p className="w-24 truncate text-center text-sm font-semibold capitalize">
                      {name}
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

export default HomePage;
