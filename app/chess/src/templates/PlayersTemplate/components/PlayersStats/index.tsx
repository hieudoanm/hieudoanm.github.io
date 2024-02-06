import { FullChessPlayer } from '@chess/app/api/chess/players/service';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';
import { PlayersStat } from '../PlayersStat';

export type Stat = {
  average: number;
  max: number;
};

export type Stats = {
  rapid: Stat;
  blitz: Stat;
  bullet: Stat;
};

export type PlayersStatsProperties = {
  players: FullChessPlayer[];
  stats: Stats;
};

export const PlayersStats: React.FC<PlayersStatsProperties> = ({
  players = [],
  stats,
}) => {
  if (players.length === 0) return <></>;

  return (
    <>
      <h1 className="text-center text-lg md:text-left md:text-2xl">Stats</h1>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
        <div className="col-span-1">
          <PlayersStat
            title="Rapid"
            average={stats.rapid.average}
            max={stats.rapid.max}
            icon={FaClock}
          />
        </div>
        <div className="col-span-1">
          <PlayersStat
            title="Blitz"
            average={stats.blitz.average}
            max={stats.blitz.max}
            icon={FaBolt}
          />
        </div>
        <div className="col-span-1">
          <PlayersStat
            title="Bullet"
            average={stats.bullet.average}
            max={stats.bullet.max}
            icon={FaRocket}
          />
        </div>
      </div>
      <div className="divider" />
    </>
  );
};

PlayersStats.displayName = 'PlayersStats';
