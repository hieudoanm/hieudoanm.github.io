import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { ChessOpening } from '@prisma/client';

export const resolvers = {
  Chess: {
    ecos: async (
      _parent: unknown,
      _parameters: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<string[]> => {
      return chessDataSource.getEcos();
    },
    openings: async (
      _parent: unknown,
      {
        eco = '',
        name = '',
        limit = 100,
        offset = 0,
      }: { eco: string; name: string; limit: number; offset: number },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessOpening[]> => {
      const { openings = [] } = await chessDataSource.getOpenings({
        eco,
        name,
        limit,
        offset,
      });
      return openings;
    },
  },
};
