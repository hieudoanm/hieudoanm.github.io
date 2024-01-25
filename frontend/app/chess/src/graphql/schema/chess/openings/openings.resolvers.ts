import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { ChessOpening } from '@chess/graphql/data/chess.types';

export const resolvers = {
  Chess: {
    openings: async (
      _parent: unknown,
      { eco = '', name = '' }: { eco: string; name: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessOpening[]> => {
      const { openings = [] } = await chessDataSource.getOpenings({
        eco,
        name,
      });
      return openings;
    },
  },
};
