import { ChessHeader } from '@chess/components/molecules/ChessHeader';
import { ChessRecord } from '@chess/components/molecules/ChessRecord';
import { ChessStats as ChessStatsComponent } from '@chess/components/molecules/ChessStats';
import { ChessPlayer, ChessStats, ChessTimeClass } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

export type PlayerTemplateProperties = {
  player?: ChessPlayer & { stats: ChessStats[] };
  month?: string;
  setMonth?: Dispatch<SetStateAction<string>>;
};

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

export const PlayerTemplate: React.FC<PlayerTemplateProperties> = ({
  player = {} as ChessPlayer & { stats: ChessStats[] },
}) => {
  const options: string[] = (player.archives || []).map((archive: string) => {
    const paths = archive.split('/');
    const month = paths[`${paths.length - 1}`];
    const year = paths[`${paths.length - 2}`];
    return `${year}/${month}`;
  });
  options.sort((a: string, b: string) => (a < b ? 1 : -1));

  const rapidStats = getRatingByTimeClass('rapid', player.stats);
  const blitzStats = getRatingByTimeClass('blitz', player.stats);
  const bulletStats = getRatingByTimeClass('bullet', player.stats);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <ChessHeader
        avatar={player.avatar}
        name={player.name}
        title={player.title ?? ''}
        username={player.username}
        verified={player.verified}
        twitch_url={player.twitchUrl}
        is_streamer={player.isStreamer}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="col-span-1">
          <ChessStatsComponent
            label="Rapid"
            last={rapidStats.last ?? 0}
            best={rapidStats.best ?? 0}
            icon={FaClock}
          />
        </div>
        <div className="col-span-1">
          <ChessStatsComponent
            label="Blitz"
            last={blitzStats.last ?? 0}
            best={blitzStats.best ?? 0}
            icon={FaBolt}
          />
        </div>
        <div className="col-span-1">
          <ChessStatsComponent
            label="Bullet"
            last={bulletStats.last ?? 0}
            best={bulletStats.best ?? 0}
            icon={FaRocket}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="col-span-1">
          <ChessRecord
            timeClass="Rapid"
            win={rapidStats.win ?? 0}
            draw={rapidStats.draw ?? 0}
            loss={rapidStats.loss ?? 0}
          />
        </div>
        <div className="col-span-1">
          <ChessRecord
            timeClass="Blitz"
            win={blitzStats.win ?? 0}
            draw={blitzStats.draw ?? 0}
            loss={blitzStats.loss ?? 0}
          />
        </div>
        <div className="col-span-1">
          <ChessRecord
            timeClass="Bullet"
            win={bulletStats.win ?? 0}
            draw={bulletStats.draw ?? 0}
            loss={bulletStats.loss ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerTemplate;
