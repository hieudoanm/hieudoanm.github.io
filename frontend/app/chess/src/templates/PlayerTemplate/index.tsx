import { ChessHeader } from '@chess/components/molecules/ChessHeader';
import { ChessRecord } from '@chess/components/molecules/ChessRecord';
import { ChessStats } from '@chess/components/molecules/ChessStats';
import { Player } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';

export type PlayerTemplateProperties = {
  player?: Player;
  month?: string;
  setMonth?: Dispatch<SetStateAction<string>>;
};

export const PlayerTemplate: React.FC<PlayerTemplateProperties> = ({
  player = {} as Player,
}) => {
  const options: string[] = (player.archives || []).map((archive: string) => {
    const paths = archive.split('/');
    const month = paths[`${paths.length - 1}`];
    const year = paths[`${paths.length - 2}`];
    return `${year}/${month}`;
  });
  options.sort((a: string, b: string) => (a < b ? 1 : -1));

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
          <ChessStats
            label="Rapid"
            last={player.statsRapidRatingLast ?? 0}
            best={player.statsRapidRatingBest ?? 0}
            icon={FaClock}
          />
        </div>
        <div className="col-span-1">
          <ChessStats
            label="Blitz"
            last={player.statsBlitzRatingLast ?? 0}
            best={player.statsBlitzRatingBest ?? 0}
            icon={FaBolt}
          />
        </div>
        <div className="col-span-1">
          <ChessStats
            label="Bullet"
            last={player.statsBulletRatingLast ?? 0}
            best={player.statsBulletRatingBest ?? 0}
            icon={FaRocket}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="col-span-1">
          <ChessRecord
            timeClass="Rapid"
            win={player.statsRapidRecordWin ?? 0}
            draw={player.statsRapidRecordDraw ?? 0}
            loss={player.statsRapidRecordLoss ?? 0}
          />
        </div>
        <div className="col-span-1">
          <ChessRecord
            timeClass="Blitz"
            win={player.statsBlitzRecordWin ?? 0}
            draw={player.statsBlitzRecordDraw ?? 0}
            loss={player.statsBlitzRecordLoss ?? 0}
          />
        </div>
        <div className="col-span-1">
          <ChessRecord
            timeClass="Bullet"
            win={player.statsBulletRecordWin ?? 0}
            draw={player.statsBulletRecordDraw ?? 0}
            loss={player.statsBulletRecordLoss ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerTemplate;
