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
    title: (
      _parent: unknown,
      {
        countryCode,
        title,
        timeRange = 'year',
      }: { countryCode: string; title: string; timeRange: TimeRange },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<Titled> => {
      return chessDataSource.getTitle({ countryCode, title, timeRange });
    },
  },
};
