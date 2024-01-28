import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Link,
  List,
  ListItem,
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
import {
  GAP,
  TITLED_ABBREVIATIONS,
} from '@chess/common/constants/chess.constants';
import flags from '@chess/common/json/flags.json';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { ChessHistogramChart } from '@chess/components/molecules/ChessHistogramChart';
import {
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitle,
} from '@prisma/client';
import { IconType } from 'react-icons';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

const getRatingByTimeClass = (
  chessTimeClass: ChessTimeClass,
  stats: ChessStats[] = []
): number => {
  const chessStats = (stats ?? []).find(({ timeClass }) => {
    return timeClass === chessTimeClass;
  });
  return chessStats?.last ?? 0;
};

const PlayersTable: React.FC<{
  total: number;
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ total = 0, players = [] }) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Heading className="text-xl">Players ({total})</Heading>
      </CardHeader>
      <Divider />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th className="w-4">Title</Th>
              <Th>Username</Th>
              <Th isNumeric className="w-4">
                Bullet
              </Th>
              <Th isNumeric className="w-4">
                Blitz
              </Th>
              <Th isNumeric className="w-4">
                Rapid
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {players.map(
              ({ title, username = '', avatar = '', stats = [] }) => {
                return (
                  <Tr key={username}>
                    <Td>
                      <TitleBadge title={title} />
                    </Td>
                    <Td>
                      <Link href={`/players/${encodeURIComponent(username)}`}>
                        <div className="inline-flex items-center gap-x-2">
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
                          <Text>{username}</Text>
                        </div>
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
    </Card>
  );
};

const CountryStats: React.FC<{
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
            <StatNumber>{average.toLocaleString()}</StatNumber>
            <StatHelpText>Highest: {max}</StatHelpText>
          </Stat>
          {/* {icon ? (
            <div>
              <Box bgColor={'teal.500'} color={'white'} className="rounded p-2">
                <Icon as={icon} boxSize={6} />
              </Box>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </CardBody>
    </Card>
  );
};

const RapidHistogramChart: React.FC<{
  players: (ChessPlayer & { stats: ChessStats[] })[];
}> = ({ players = [] }) => {
  const ratedPlayers = players.filter(
    ({ stats = [] }) => getRatingByTimeClass('rapid', stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats = [] }) =>
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
      ({ stats = [] }) =>
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
    ({ stats = [] }) => getRatingByTimeClass('blitz', stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats = [] }) =>
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
      ({ stats = [] }) =>
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

type CountryStat = { average: number; max: number };

export type CountryStats = {
  rapid: CountryStat;
  blitz: CountryStat;
  bullet: CountryStat;
};

type CountryTemplateProperties = {
  countryCode: string;
  stats: CountryStats;
  total: number;
  titles: { title: ChessTitle; total: number }[];
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const CountryTemplate: React.FC<CountryTemplateProperties> = ({
  countryCode = '',
  stats,
  total = 0,
  titles = [],
  players = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <Heading style={{ wordSpacing: '16px' }}>
        {(flags as Record<string, string>)[countryCode]} {countryCode}
      </Heading>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
        <div className="col-span-1">
          <CountryStats
            title="Rapid"
            average={stats?.rapid?.average ?? 0}
            max={stats?.rapid?.max ?? 0}
            icon={FaClock}
          />
        </div>
        <div className="col-span-1">
          <CountryStats
            title="Blitz"
            average={stats?.blitz?.average ?? 0}
            max={stats?.blitz?.max ?? 0}
            icon={FaBolt}
          />
        </div>
        <div className="col-span-1">
          <CountryStats
            title="Bullet"
            average={stats?.bullet?.average ?? 0}
            max={stats?.bullet?.max ?? 0}
            icon={FaRocket}
          />
        </div>
      </div>
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
      <Card className="border border-gray-200 shadow">
        <CardHeader>
          <Heading className="text-xl">Titles</Heading>
        </CardHeader>
        <List>
          {titles.map(({ title, total }) => {
            return (
              <ListItem key={title} className="border-t px-4 py-2">
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Link href={`/titled/${title}`}>
                    <div className="inline-flex items-center gap-x-2">
                      <TitleBadge title={title} />
                      <Text>{TITLED_ABBREVIATIONS[title]}</Text>
                    </div>
                  </Link>
                  <Text>{total}</Text>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Card>
      <PlayersTable total={total} players={players} />
    </div>
  );
};
