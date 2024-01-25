import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { TimeRange, Titled } from '@chess/graphql/data/chess.types';

export const resolvers = {
  Chess: {
    titled: (
      _parent: unknown,
      { title, timeRange = 'year' }: { title: string; timeRange: TimeRange },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<Titled> => {
      return chessDataSource.getTitled({ title, timeRange });
    },
  },
};
