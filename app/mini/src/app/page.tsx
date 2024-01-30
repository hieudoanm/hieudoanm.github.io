'use client';

import { Box, Icon, Text } from '@chakra-ui/react';
import Container from '@mini/common/components/Container';
import { APP_NAME } from '@mini/common/constants/time.constants';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaIdBadge } from 'react-icons/fa';
import {
  FaBrain,
  FaCalendar,
  FaClock,
  FaCloudSunRain,
  FaFlag,
} from 'react-icons/fa6';

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
        <title>{APP_NAME}</title>
      </Head>
      <Container>
        <div className="h-full w-full">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-6 xl:gap-8">
            {apps.map(({ id, name, icon }) => {
              return (
                <Box key={id} className="col-span-1">
                  <div className="flex aspect-square items-center justify-center">
                    <Link href={`/${encodeURI(id)}`}>
                      <Box className="flex flex-col items-center gap-y-2 md:gap-y-4">
                        <div className="flex aspect-square h-16 w-16 items-center justify-center rounded border md:h-20 md:w-20 lg:h-24 lg:w-24">
                          <Icon
                            as={icon}
                            className="text-base md:text-lg lg:text-xl"
                          />
                        </div>
                        <Text className="text-center">{name}</Text>
                      </Box>
                    </Link>
                  </div>
                </Box>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
