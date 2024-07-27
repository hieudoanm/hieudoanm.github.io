import { ChessStats, ChessTimeClass } from '@prisma/client';
import { PlayerRecord } from '../PlayerRecord';

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

export type PlayerRecordsProperties = { stats: ChessStats[] };

export const PlayerRecords: React.FC<PlayerRecordsProperties> = ({
  stats = [],
}) => {
  const rapidStats = getRatingByTimeClass(ChessTimeClass.rapid, stats);
  const blitzStats = getRatingByTimeClass(ChessTimeClass.blitz, stats);
  const bulletStats = getRatingByTimeClass(ChessTimeClass.bullet, stats);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
      <div className="col-span-1">
        <PlayerRecord
          timeClass={ChessTimeClass.rapid}
          win={rapidStats.win ?? 0}
          draw={rapidStats.draw ?? 0}
          loss={rapidStats.loss ?? 0}
        />
      </div>
      <div className="col-span-1">
        <PlayerRecord
          timeClass={ChessTimeClass.blitz}
          win={blitzStats.win ?? 0}
          draw={blitzStats.draw ?? 0}
          loss={blitzStats.loss ?? 0}
        />
      </div>
      <div className="col-span-1">
        <PlayerRecord
          timeClass={ChessTimeClass.bullet}
          win={bulletStats.win ?? 0}
          draw={bulletStats.draw ?? 0}
          loss={bulletStats.loss ?? 0}
        />
      </div>
    </div>
  );
};
