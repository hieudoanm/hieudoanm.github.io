import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import {
  FaCalendarDays,
  FaChartLine,
  FaClock,
  FaCloudSunRain,
  FaCompass,
  FaEnvelopesBulk,
  FaFileLines,
  FaFileZipper,
  FaHeart,
  FaMapLocationDot,
  FaMessage,
  FaMusic,
  FaNewspaper,
  FaPhone,
  FaPhotoFilm,
  FaRectangleList,
  FaScrewdriverWrench,
  FaTemperatureFull,
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
      id: 'calendar',
      href: 'calendar',
      name: 'calendar',
      icon: <FaCalendarDays className="text-2xl" />,
    },
    {
      id: 'clock',
      href: 'clock',
      name: 'clock',
      icon: <FaClock className="text-2xl" />,
    },
    {
      id: 'compass',
      href: 'compass',
      name: 'compass',
      icon: <FaCompass className="text-2xl" />,
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
      id: 'health',
      href: 'health',
      name: 'health',
      icon: <FaTemperatureFull className="text-2xl" />,
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
      icon: <FaScrewdriverWrench className="text-2xl" />,
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
      id: 'weather',
      href: 'weather',
      name: 'weather',
      icon: <FaCloudSunRain className="text-2xl" />,
    },
  ];
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-6">
          {apps.map(({ id, href, name, icon }) => {
            return (
              <div key={id} className="col-span-1">
                <div className="flex h-full items-center justify-center">
                  <Link href={`/${href}`} className="flex flex-col gap-y-1">
                    <div className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full bg-black text-white">
                      {icon}
                    </div>
                    <p className="text-center text-sm font-semibold capitalize">
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
