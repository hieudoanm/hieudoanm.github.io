import { gql } from '@apollo/client';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { GAP, TITLED_ABBREVIATIONS } from '@chess/common/constants';
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import {
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitle,
} from '@chess/common/types/chess';
import { TimeRange } from '@chess/common/types/time';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { Container } from '@chess/components/atoms/Container';
import { ChessHistogramChart } from '@chess/components/molecules/ChessHistogramChart';
import { Layout } from '@chess/layout';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { IconType } from 'react-icons';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

const getRatingByTimeClass = (
  chessTimeClass: ChessTimeClass,
  stats: ChessStats[] = []
): number => {
  const chessStats = stats.find(({ timeClass }) => {
    return timeClass === chessTimeClass;
  });
  return chessStats?.last ?? 0;
};

const RapidHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats }: { stats: ChessStats[] }) =>
      getRatingByTimeClass('rapid', stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats }: { stats: ChessStats[] }) =>
    getRatingByTimeClass('rapid', stats)
  );
  const max: number = Math.round(Math.max(...ratings) / GAP) * GAP;
  const min: number = Math.round(Math.min(...ratings) / GAP) * GAP;
  const range: number[] = Array.from({ length: (max - min) / GAP }).map(
    (_value: unknown, index: number) => min + index * GAP
  );

  if (range.length === 0) {
    return <></>;
  }

  const data = range.map((point: number) => {
    const label = `${point} - ${point + 100}`;
    const value = ratedPlayers.filter(
      ({ stats }) =>
        getRatingByTimeClass('rapid', stats) >= point &&
        getRatingByTimeClass('rapid', stats) < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Rapid" data={data} />;
};

const BlitzHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats }) => getRatingByTimeClass('blitz', stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats }) =>
    getRatingByTimeClass('blitz', stats)
  );
  const max: number = Math.round(Math.max(...ratings) / GAP) * GAP;
  const min: number = Math.round(Math.min(...ratings) / GAP) * GAP;
  const range: number[] = Array.from({ length: (max - min) / GAP }).map(
    (_value: unknown, index: number) => min + index * GAP
  );

  if (range.length === 0) {
    return <></>;
  }

  const data = range.map((point: number) => {
    const label = `${point} - ${point + 100}`;
    const value = ratedPlayers.filter(
      ({ stats }) =>
        getRatingByTimeClass('blitz', stats) >= point &&
        getRatingByTimeClass('blitz', stats) < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Blitz" data={data} />;
};

const BulletHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats = [] }) => getRatingByTimeClass('bullet', stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats = [] }) =>
    getRatingByTimeClass('bullet', stats)
  );
  const max: number = Math.round(Math.max(...ratings) / GAP) * GAP;
  const min: number = Math.round(Math.min(...ratings) / GAP) * GAP;
  const range: number[] = Array.from({ length: (max - min) / GAP }).map(
    (_value: unknown, index: number) => min + index * GAP
  );

  if (range.length === 0) {
    return <></>;
  }

  const data = range.map((point: number) => {
    const label = `${point} - ${point + 100}`;
    const value = ratedPlayers.filter(
      ({ stats = [] }) =>
        getRatingByTimeClass('bullet', stats) >= point &&
        getRatingByTimeClass('bullet', stats) < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Bullet" data={data} />;
};

const TitledStats: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: IconType;
}> = ({ title = '', average = 0, max = 0, icon }) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardBody>
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel>Average {title}</StatLabel>
            <StatNumber>{average}</StatNumber>
            <StatHelpText>Highest: {max}</StatHelpText>
          </Stat>
          {icon ? (
            <div>
              <Box bgColor={'teal.500'} color={'white'} className="rounded p-2">
                <Icon as={icon} boxSize={6} />
              </Box>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const PlayersTable: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardBody className="p-0">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th className="w-4">No</Th>
                <Th>Username</Th>
                <Th className="w-4" isNumeric>
                  Country
                </Th>
                <Th className="w-4" isNumeric>
                  Rapid
                </Th>
                <Th className="w-4" isNumeric>
                  Blitz
                </Th>
                <Th className="w-4" isNumeric>
                  Bullet
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {players.map(
                (
                  {
                    username = '',
                    avatar = '',
                    country = '',
                    countryCode = '',
                    stats = [],
                  },
                  index: number
                ) => {
                  return (
                    <Tr key={username}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Link
                          href={`/${username}`}
                          className="inline-flex items-center gap-2">
                          {avatar.length > 0 ? (
                            <div
                              className="aspect-square w-8 rounded bg-contain bg-center"
                              style={{
                                backgroundImage: `url(${avatar})`,
                              }}
                            />
                          ) : (
                            <div className="aspect-square w-8 rounded border" />
                          )}
                          <Text className="inline">{username}</Text>
                        </Link>
                      </Td>
                      <Td isNumeric>
                        <Link href={`/countries/${countryCode}`}>
                          {country}
                        </Link>
                      </Td>
                      <Td isNumeric>{getRatingByTimeClass('rapid', stats)}</Td>
                      <Td isNumeric>{getRatingByTimeClass('blitz', stats)}</Td>
                      <Td isNumeric>{getRatingByTimeClass('bullet', stats)}</Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

type TitledPageProperties = {
  title: ChessTitle;
  timeRange: TimeRange;
  averageRapidRating: number;
  averageBlitzRating: number;
  averageBulletRating: number;
  maxRapidRating: number;
  maxBlitzRating: number;
  maxBulletRating: number;
  total: number;
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

const TitledPage: NextPage<TitledPageProperties> = ({
  title = 'GM' as ChessTitle,
  timeRange: initialTimeRange = 'year',
  averageRapidRating = 0,
  averageBlitzRating = 0,
  averageBulletRating = 0,
  maxRapidRating = 0,
  maxBlitzRating = 0,
  maxBulletRating = 0,
  total = 0,
  players = [],
}) => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  className="bg-white px-0 text-lg md:text-4xl">
                  {TITLED_ABBREVIATIONS[title]} ({total})
                </MenuButton>
                <MenuList>
                  {Object.entries(TITLED_ABBREVIATIONS)
                    .filter(([key, value]) => !value.includes('Arena'))
                    .map(([key, value]) => (
                      <MenuItem
                        key={key}
                        className={`${title === key ? 'font-bold' : ''}`}
                        onClick={() => {
                          router.push({
                            pathname: router.pathname,
                            query: { ...router.query, title: key },
                          });
                        }}>
                        {value}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
              <Box className="rounded shadow">
                <Select
                  id="timeRange"
                  name="timeRange"
                  placeholder="Time Range"
                  value={timeRange}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const newTimeRange = event.target.value as TimeRange;
                    setTimeRange(newTimeRange);
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, timeRange: newTimeRange },
                    });
                  }}>
                  <option value="week">7 Days</option>
                  <option value="month">30 Days</option>
                  <option value="quarter">90 Days</option>
                  <option value="year">1 Year</option>
                </Select>
              </Box>
            </Box>
            {players.length > 1 ? (
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
                <div className="col-span-1">
                  <TitledStats
                    title="Rapid"
                    average={averageRapidRating}
                    max={maxRapidRating}
                    icon={FaClock}
                  />
                </div>
                <div className="col-span-1">
                  <TitledStats
                    title="Blitz"
                    average={averageBlitzRating}
                    max={maxBlitzRating}
                    icon={FaBolt}
                  />
                </div>
                <div className="col-span-1">
                  <TitledStats
                    title="Bullet"
                    average={averageBulletRating}
                    max={maxBulletRating}
                    icon={FaRocket}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {players.length > 1 ? (
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
                <div className="col-span-1">
                  <RapidHistogramChart players={players} />
                </div>
                <div className="col-span-1">
                  <BlitzHistogramChart players={players} />
                </div>
                <div className="col-span-1">
                  <BulletHistogramChart players={players} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <PlayersTable players={players} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const query = gql`
  query TitledQuery($title: Title!, $timeRange: TimeRange) {
    chess {
      titled(title: $title, timeRange: $timeRange) {
        averageRapidRating
        averageBlitzRating
        averageBulletRating
        maxRapidRating
        maxBlitzRating
        maxBulletRating
        total
        players {
          id
          username
          name
          followers
          avatar
          location
          country
          countryCode
          twitchUrl
          isStreamer
          verified
          lastOnline
          joined
          status
          title
          league
          archives
          stats {
            timeClass
            best
            last
            deviation
            win
            draw
            loss
          }
        }
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps<TitledPageProperties> =
  async (context: GetServerSidePropsContext) => {
    const title: ChessTitle = resolveQuery(
      context.query,
      'title',
      'GM'
    ) as ChessTitle;
    const timeRange: TimeRange = resolveQuery(
      context.query,
      'timeRange',
      'year'
    ) as TimeRange;
    try {
      const response = await apolloClient.query<{
        chess: { titled: TitledPageProperties };
      }>({
        query,
        variables: { title, timeRange },
      });
      logger.info(`getServerSideProps title=${title} timeRange=${timeRange}`);
      const {
        data: {
          chess: {
            titled: {
              averageRapidRating = 0,
              averageBlitzRating = 0,
              averageBulletRating = 0,
              maxRapidRating = 0,
              maxBlitzRating = 0,
              maxBulletRating = 0,
              total = 0,
              players = [],
            },
          },
        },
      } = response;
      return {
        props: {
          title,
          timeRange,
          averageRapidRating,
          averageBlitzRating,
          averageBulletRating,
          maxRapidRating,
          maxBlitzRating,
          maxBulletRating,
          total,
          players,
        },
      };
    } catch (error) {
      logger.error(
        `getServerSideProps title=${title} timeRange=${timeRange} error=${error}`
      );
      return {
        props: {
          title,
          timeRange,
          averageRapidRating: 0,
          averageBlitzRating: 0,
          averageBulletRating: 0,
          maxRapidRating: 0,
          maxBlitzRating: 0,
          maxBulletRating: 0,
          total: 0,
          players: [],
        },
      };
    }
  };

export default TitledPage;
