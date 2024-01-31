'use client';

import { Icon } from '@chakra-ui/react';
import { APP_NAME } from '@mini/common/constants/time.constants';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { FaIdBadge } from 'react-icons/fa';
import {
  FaBrain,
  FaCalendar,
  FaClock,
  FaCloudSunRain,
  FaFlag,
} from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';

type AppProps = { id: string; icon: IconType; name: string };

const App: React.FC<AppProps> = ({ id, name, icon }) => {
  return (
    <div className="flex items-center justify-center">
      <Link href={`/${encodeURI(id)}`}>
        <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
          <div className="flex aspect-square h-16 w-16 items-center justify-center border hover:shadow md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full transition-all ease-linear">
            <Icon as={icon} className="text-base md:text-lg lg:text-xl" />
          </div>
          <p className="text-center text-sm md:text-base">{name}</p>
        </div>
      </Link>
    </div>
  );
};

const HomePage: NextPage = () => {
  const apps = [
    { id: 'calendar', name: 'Calendar', icon: FaCalendar },
    { id: 'hofstede', name: 'Hofstede', icon: FaBrain },
    { id: 'pomodoro', name: 'Pomodoro', icon: FaClock },
    { id: 'status', name: 'Status', icon: FaFlag },
    { id: 'uuid', name: 'UUID', icon: FaIdBadge },
    { id: 'weather', name: 'Weather', icon: FaCloudSunRain },
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
