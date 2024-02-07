'use client';

import { ChessPlayer, ChessStats } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { PlayerHeader } from './components/PlayerHeader';
import { PlayerRecords } from './components/PlayerRecords';
import { PlayerStats } from './components/PlayerStats';

export type PlayerTemplateProperties = {
  player?: ChessPlayer & { stats: ChessStats[] };
  month?: string;
  setMonth?: Dispatch<SetStateAction<string>>;
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

  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <PlayerHeader
        avatar={player.avatar}
        name={player.name}
        title={player.title}
        username={player.username}
        verified={player.verified}
        twitch_url={player.twitchUrl}
        is_streamer={player.isStreamer}
      />
      <PlayerStats stats={player.stats} />
      <PlayerRecords stats={player.stats} />
    </div>
  );
};

export default PlayerTemplate;
