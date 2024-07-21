import { ChessStats, ChessTimeClass } from '@prisma/client';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';
import { PlayerStat } from '../PlayerStat';

const getRatingByTimeClass = (
  chessTimeClass: ChessTimeClass,
  stats: ChessStats[] = []
): { best: number; last: number; win: number; draw: number; loss: number } => {
  const chessStats = (stats ?? []).find(({ timeClass }) => {
    return timeClass === chessTimeClass;
  });
  return {
    best: chessStats?.best ?? 0,
    last: chessStats?.last ?? 0,
    win: chessStats?.win ?? 0,
    draw: chessStats?.draw ?? 0,
    loss: chessStats?.loss ?? 0,
  };
};

export type PlayerStatsProperties = { stats: ChessStats[] };

export const PlayerStats: React.FC<PlayerStatsProperties> = ({
  stats = [],
}) => {
  const rapidStats = getRatingByTimeClass(ChessTimeClass.rapid, stats);
  const blitzStats = getRatingByTimeClass(ChessTimeClass.blitz, stats);
  const bulletStats = getRatingByTimeClass(ChessTimeClass.bullet, stats);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
      <div className="col-span-1">
        <PlayerStat
          timeClass={ChessTimeClass.rapid}
          last={rapidStats.last ?? 0}
          best={rapidStats.best ?? 0}
          icon={<FaClock size={16} />}
        />
      </div>
      <div className="col-span-1">
        <PlayerStat
          timeClass={ChessTimeClass.blitz}
          last={blitzStats.last ?? 0}
          best={blitzStats.best ?? 0}
          icon={<FaBolt size={16} />}
        />
      </div>
      <div className="col-span-1">
        <PlayerStat
          timeClass={ChessTimeClass.blitz}
          last={bulletStats.last ?? 0}
          best={bulletStats.best ?? 0}
          icon={<FaRocket size={16} />}
        />
      </div>
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
