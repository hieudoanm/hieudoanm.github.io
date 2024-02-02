'use client';

import { APP_NAME } from '@sunil/common/constants/app.constants';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import {
  FaBrain,
  FaCalendar,
  FaClock,
  FaCloudSunRain,
  FaFlag,
  FaIdBadge,
} from 'react-icons/fa6';

type AppProps = { id: string; icon: ReactNode; name: string };

const App: React.FC<AppProps> = ({ id, name, icon }) => {
  return (
    <div className="flex items-center justify-center">
      <Link href={`/${encodeURI(id)}`}>
        <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
          <div className="flex aspect-square h-16 w-16 items-center justify-center border hover:shadow md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full transition-all ease-linear">
            {icon}
          </div>
          <p className="text-center text-sm md:text-base">{name}</p>
        </div>
      </Link>
    </div>
  );
};

const HomePage: NextPage = () => {
  const apps = [
    {
      id: 'calendar',
      name: 'Calendar',
      icon: <FaCalendar className="text-base md:text-lg lg:text-xl" />,
    },
    {
      id: 'hofstede',
      name: 'Hofstede',
      icon: <FaBrain className="text-base md:text-lg lg:text-xl" />,
    },
    {
      id: 'pomodoro',
      name: 'Pomodoro',
      icon: <FaClock className="text-base md:text-lg lg:text-xl" />,
    },
    {
      id: 'status',
      name: 'Status',
      icon: <FaFlag className="text-base md:text-lg lg:text-xl" />,
    },
    {
      id: 'uuid',
      name: 'UUID',
      icon: <FaIdBadge className="text-base md:text-lg lg:text-xl" />,
    },
    {
      id: 'weather',
      name: 'Weather',
      icon: <FaCloudSunRain className="text-base md:text-lg lg:text-xl" />,
    },
  ];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Home</title>
      </Head>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 min-h-full">
        {apps.map(({ id, name, icon }) => (
          <div key={id} className="col-span-1">
            <App id={id} name={name} icon={icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
