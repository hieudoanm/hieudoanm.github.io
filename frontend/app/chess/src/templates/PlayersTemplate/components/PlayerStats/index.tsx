import { ChessCountry, ChessPlayer, ChessStats } from '@prisma/client';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';
import { PlayerStat } from '../PlayerStat';

export type Stat = {
  average: number;
  max: number;
};

export type Stats = {
  rapid: Stat;
  blitz: Stat;
  bullet: Stat;
};

export type PlayerStatsProperties = {
  players: (ChessStats & { player: ChessPlayer & { country: ChessCountry } })[];
  stats: Stats;
};

export const PlayerStats: React.FC<PlayerStatsProperties> = ({
  players = [],
  stats,
}) => {
  if (players.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <div className="col-span-1">
        <PlayerStat
          title="Rapid"
          average={stats.rapid.average}
          max={stats.rapid.max}
          icon={FaClock}
        />
      </div>
      <div className="col-span-1">
        <PlayerStat
          title="Blitz"
          average={stats.blitz.average}
          max={stats.blitz.max}
          icon={FaBolt}
        />
      </div>
      <div className="col-span-1">
        <PlayerStat
          title="Bullet"
          average={stats.bullet.average}
          max={stats.bullet.max}
          icon={FaRocket}
        />
      </div>
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
