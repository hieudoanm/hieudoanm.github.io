import { Divider, Heading } from '@chakra-ui/react';
import { ChessTimeClass } from '@prisma/client';
import { FullChessPlayer, PlayersDistribution } from '../PlayersDistribution';

export type PlayersDistributionsProperties = {
  players: FullChessPlayer[];
};

export const PlayersDistributions: React.FC<PlayersDistributionsProperties> = ({
  players = [],
}) => {
  if (players.length === 0) return <></>;

  return (
    <>
      <Heading className="text-center text-lg md:text-left md:text-2xl">
        Distribution
      </Heading>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
        <div className="col-span-1">
          <PlayersDistribution
            timeClass={ChessTimeClass.rapid}
            players={players}
          />
        </div>
        <div className="col-span-1">
          <PlayersDistribution
            timeClass={ChessTimeClass.blitz}
            players={players}
          />
        </div>
        <div className="col-span-1">
          <PlayersDistribution
            timeClass={ChessTimeClass.bullet}
            players={players}
          />
        </div>
      </div>
      <Divider />
    </>
  );
};

PlayersDistributions.displayName = 'PlayersDistributions';
