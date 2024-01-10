import { ChessOpening } from '@prisma/client';
import { ChessContext } from '../chess.types';

export const resolvers = {
  Chess: {
    openings: async (
      _parent: unknown,
      { eco = '', name = '' }: { eco: string; name: string },
      { chessDataSource }: ChessContext
    ): Promise<ChessOpening[]> => {
      const { openings = [] } = await chessDataSource.getOpenings({
        eco,
        name,
      });
      return openings;
    },
  },
};
