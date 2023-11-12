import { Box, Icon, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FaBrain,
  FaCalendar,
  FaClock,
  FaCloudSunRain,
  FaFlag,
} from 'react-icons/fa6';
import Container from '../../components/atoms/Container';
import { APP_NAME } from '../../constants';
import { FaIdBadge } from 'react-icons/fa';

export const AppsPage: React.FC = () => {
  const apps = [
    { id: 'calendar', name: 'Calendar', icon: FaCalendar },
    { id: 'hofstede', name: 'Hofstede', icon: FaBrain },
    { id: 'pomodoro', name: 'Pomodoro', icon: FaClock },
    { id: 'statuses', name: 'Statuses', icon: FaFlag },
    { id: 'uuid', name: 'UUID', icon: FaIdBadge },
    { id: 'weather', name: 'Weather', icon: FaCloudSunRain },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{APP_NAME}</title>
      </Helmet>
      <Container>
        <div className="h-full w-full">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-6 xl:gap-8">
            {apps.map(({ id, name, icon }) => {
              return (
                <Box key={id} className="col-span-1">
                  <div className="flex aspect-square items-center justify-center">
                    <Link to={`/apps/${id}`}>
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

export default AppsPage;
