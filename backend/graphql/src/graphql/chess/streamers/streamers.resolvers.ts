import {
  ChessTitle,
  StreamersResponse,
} from '@hieudoanm/common/data/chess/chess.types';
import { ChessContext } from '../chess.types';

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
