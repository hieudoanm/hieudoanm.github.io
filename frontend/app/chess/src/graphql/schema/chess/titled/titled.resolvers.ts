import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { TimeRange, Titled } from '@chess/graphql/data/chess.types';
import { ChessTitle } from '@prisma/client';

export const resolvers = {
  Chess: {
    titled: (
      _parent: unknown,
      _parameters: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessTitle[]> => {
      return chessDataSource.getTitled();
    },
  },
};
