import { NextPage } from 'next';
import Link from 'next/link';
import { JSX } from 'react';
import {
  FaCalendarDays,
  FaClock,
  FaCloudSunRain,
  FaCompass,
  FaHeart,
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
      id: 'weather',
      href: 'weather',
      name: 'weather',
      icon: <FaCloudSunRain className="text-2xl" />,
    },
  ];
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-300">
      <div className="container mx-auto h-full p-4 md:p-8">
        <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-6">
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
