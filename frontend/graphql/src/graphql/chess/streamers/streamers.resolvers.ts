import { ChessTitle } from '@prisma/client';
import { ChessContext } from '../chess.types';
import { StreamersResponse } from '../../../common/data/chess/chess.types';

export const resolvers = {
  Chess: {
    streamers: async (
      _parent: unknown,
      { title, country }: { title: ChessTitle; country: string },
      { chessDataSource }: ChessContext
    ): Promise<StreamersResponse> => {
      const {
        total = 0,
        players = [],
        countries = [],
      } = await chessDataSource.getStreamers({
        title,
        country,
      });
      return { total, players, countries };
    },
  },
};
