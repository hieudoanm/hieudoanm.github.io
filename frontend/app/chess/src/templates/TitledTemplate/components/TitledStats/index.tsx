import { ChessPlayer } from '@prisma/client';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';
import { TitledStat } from '../TitledStat';

export type Stat = {
  average: number;
  max: number;
};

export type Stats = {
  rapid: Stat;
  blitz: Stat;
  bullet: Stat;
};

export type TitledStatsProperties = { players: ChessPlayer[]; stats: Stats };

export const TitledStats: React.FC<TitledStatsProperties> = ({
  players = [],
  stats,
}) => {
  if (players.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <div className="col-span-1">
        <TitledStat
          title="Rapid"
          average={stats.rapid.average}
          max={stats.rapid.max}
          icon={FaClock}
        />
      </div>
      <div className="col-span-1">
        <TitledStat
          title="Blitz"
          average={stats.blitz.average}
          max={stats.blitz.max}
          icon={FaBolt}
        />
      </div>
      <div className="col-span-1">
        <TitledStat
          title="Bullet"
          average={stats.bullet.average}
          max={stats.bullet.max}
          icon={FaRocket}
        />
      </div>
    </div>
  );
};

TitledStats.displayName = 'TitledStats';
