import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { ChessTitle, StreamersResponse } from '@chess/graphql/data/chess.types';

export const resolvers = {
  Chess: {
    streamers: async (
      _parent: unknown,
      { title, country }: { title: ChessTitle; country: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
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
