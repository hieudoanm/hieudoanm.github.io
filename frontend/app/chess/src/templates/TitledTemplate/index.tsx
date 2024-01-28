'use client';

import {
  Box,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
import { TimeRange } from '@chess/common/types/time';
import { ChessHistogramChart } from '@chess/components/molecules/ChessHistogramChart';
import { ChessTitledStats } from '@chess/components/molecules/ChessTitledStats';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
  ChessTitle,
} from '@prisma/client';
import Link from 'next/link';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

export type FullChessPlayer = ChessPlayer & {
  country: ChessCountry;
  stats: ChessStats[];
};

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
  players: FullChessPlayer[];
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
  players: FullChessPlayer[];
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
  players: FullChessPlayer[];
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

const PlayersTable: React.FC<{
  players: FullChessPlayer[];
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
                    country,
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
                          href={`/players/${encodeURIComponent(username)}`}
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
                          {country.flag} {country.name}
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

export type TitledStat = {
  average: number;
  max: number;
};

export type TitledStats = {
  rapid: TitledStat;
  blitz: TitledStat;
  bullet: TitledStat;
};

export type TitledTemplateProperties = {
  timeRange: TimeRange;
  title: ChessTitle;
  stats: TitledStats;
  total: number;
  players: FullChessPlayer[];
};

export const TitledTemplate: React.FC<TitledTemplateProperties> = ({
  title,
  total = 0,
  timeRange,
  players = [],
  stats,
}) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Menu>
          <MenuButton
            // as={Button}
            // rightIcon={<Icon as={FaChevronDown} />}
            className="bg-white px-0 text-lg md:text-4xl">
            {TITLED_ABBREVIATIONS[title]} ({total})
          </MenuButton>
          <MenuList>
            {Object.entries(TITLED_ABBREVIATIONS)
              .filter(([_key, value]) => !value.includes('Arena'))
              .map(([key, value]) => (
                <MenuItem
                  key={key}
                  className={`${title === key ? 'font-bold' : ''}`}>
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
            value={timeRange}>
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
            <ChessTitledStats
              title="Rapid"
              average={stats.rapid.average}
              max={stats.rapid.max}
              icon={FaClock}
            />
          </div>
          <div className="col-span-1">
            <ChessTitledStats
              title="Blitz"
              average={stats.blitz.average}
              max={stats.blitz.max}
              icon={FaBolt}
            />
          </div>
          <div className="col-span-1">
            <ChessTitledStats
              title="Bullet"
              average={stats.bullet.average}
              max={stats.bullet.max}
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
  );
};

TitledTemplate.displayName = 'TitledTemplate';
