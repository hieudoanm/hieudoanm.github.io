import { logger } from '@chess/common/libs/logger';
import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { StreamersResponse } from '@chess/graphql/data/chess.types';
import { ChessTitle } from '@prisma/client';

export const resolvers = {
  Chess: {
    streamers: async (
      _parent: unknown,
      { title, country }: { title: ChessTitle; country: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<StreamersResponse> => {
      logger.info(`players country=${country} title=${title}`);
      try {
        const {
          total = 0,
          players = [],
          countries = [],
        } = await chessDataSource.getStreamers({
          title,
          country,
        });
        return { total, players, countries };
      } catch (error) {
        logger.error(`players error=${error}`);
        return { total: 0, players: [], countries: [] };
      }
    },
  },
};
