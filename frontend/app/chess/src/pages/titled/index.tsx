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
import { TimeRange } from '@chess/common/@types';
import { GAP, TITLED_ABBREVIATIONS } from '@chess/common/constants';
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { resolveQuery } from '@chess/common/utils/resolve-query';
import { Container } from '@chess/components/atoms/Container';
import { ChessHistogramChart } from '@chess/components/molecules/ChessHistogramChart';
import { Layout } from '@chess/layout';
import {
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitle,
} from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

const getRatingByTimeClass = (
  stats: ChessStats[],
  chessTimeClass: ChessTimeClass
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
      getRatingByTimeClass(stats, 'rapid') > 0
  );
  const ratings = ratedPlayers.map(({ stats }: { stats: ChessStats[] }) =>
    getRatingByTimeClass(stats, 'rapid')
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
        getRatingByTimeClass(stats, 'rapid') >= point &&
        getRatingByTimeClass(stats, 'rapid') < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Rapid" data={data} />;
};

const BlitzHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats }) => getRatingByTimeClass(stats, 'blitz') > 0
  );
  const ratings = ratedPlayers.map(({ stats }) =>
    getRatingByTimeClass(stats, 'blitz')
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
        getRatingByTimeClass(stats, 'blitz') >= point &&
        getRatingByTimeClass(stats, 'blitz') < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Blitz" data={data} />;
};

const BulletHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats }) => getRatingByTimeClass(stats, 'bullet') > 0
  );
  const ratings = ratedPlayers.map(({ stats }) =>
    getRatingByTimeClass(stats, 'bullet')
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
        getRatingByTimeClass(stats, 'bullet') >= point &&
        getRatingByTimeClass(stats, 'bullet') < point + 100
    ).length;
    return { label, value };
  });

  return <ChessHistogramChart title="Bullet" data={data} />;
};

const TitledStats: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: any;
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
                    stats,
                  },
                  index: number
                ) => {
                  return (
                    <Tr key={username}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Link
                          href={`/${username}`}
                          className="inline-flex items-center gap-2"
                        >
                          {avatar.length > 0 ? (
                            <div
                              className="aspect-square w-8 rounded bg-contain bg-center"
                              style={{
                                backgroundImage: `url(${avatar})`,
                              }}
                            />
                          ) : (
                            <div className="aspect-square w-8 rounded border"></div>
                          )}
                          <Text className="inline">{username}</Text>
                        </Link>
                      </Td>
                      <Td isNumeric>
                        <Link href={`/countries/${countryCode}`}>
                          {country}
                        </Link>
                      </Td>
                      <Td isNumeric>{getRatingByTimeClass(stats, 'rapid')}</Td>
                      <Td isNumeric>{getRatingByTimeClass(stats, 'blitz')}</Td>
                      <Td isNumeric>{getRatingByTimeClass(stats, 'bullet')}</Td>
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
  timeRange: initialTimeRange = 'YEAR',
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
              justifyContent={'space-between'}
            >
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  className="bg-white px-0 text-lg md:text-4xl"
                >
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
                        }}
                      >
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
                  }}
                >
                  <option value="WEEK">7 Days</option>
                  <option value="MONTH">30 Days</option>
                  <option value="QUARTER">90 Days</option>
                  <option value="YEAR">1 Year</option>
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

export const getServerSideProps: GetServerSideProps<
  TitledPageProperties
> = async (context: GetServerSidePropsContext) => {
  const title: ChessTitle = resolveQuery(
    context.query,
    'title',
    'GM'
  ) as ChessTitle;
  const timeRange: TimeRange = resolveQuery(
    context.query,
    'timeRange',
    'YEAR'
  ) as TimeRange;
  logger.info(`getServerSideProps title=${title} timeRange=${timeRange}`);
  try {
    const {
      data: {
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
    } = await apolloClient.query<{ titled: TitledPageProperties }>({
      query,
      variables: { title, timeRange },
    });
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
    logger.error(`getServerSideProps title=${title} error=${error}`);
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
