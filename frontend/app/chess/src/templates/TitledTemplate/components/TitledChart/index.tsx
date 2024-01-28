import { GAP } from '@chess/common/constants/chess.constants';
import { ChessHistogramChart } from '@chess/components/atoms/HistogramChart';
import {
  ChessCountry,
  ChessPlayer,
  ChessStats,
  ChessTimeClass,
} from '@prisma/client';

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

export type TitledChartProperties = {
  timeClass: ChessTimeClass;
  players: FullChessPlayer[];
};

export const TitledChart: React.FC<TitledChartProperties> = ({
  timeClass,
  players = [],
}) => {
  const ratedPlayers = players.filter(
    ({ stats }: { stats: ChessStats[] }) =>
      getRatingByTimeClass(timeClass, stats) > 0
  );
  const ratings = ratedPlayers.map(({ stats }: { stats: ChessStats[] }) =>
    getRatingByTimeClass(timeClass, stats)
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
        getRatingByTimeClass(timeClass, stats) >= point &&
        getRatingByTimeClass(timeClass, stats) < point + 100
    ).length;
    return { label, value };
  });

  return (
    <ChessHistogramChart timeClass={ChessTimeClass[timeClass]} data={data} />
  );
};

TitledChart.displayName = 'TitledChart';
