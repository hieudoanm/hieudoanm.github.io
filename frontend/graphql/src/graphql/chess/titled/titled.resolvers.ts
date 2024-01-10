import { TimeRange, Titled } from '../../../common/data/chess/chess.types';
import { ChessContext } from '../chess.types';

export const resolvers = {
  Chess: {
    titled: (
      _parent: unknown,
      { title, timeRange = 'year' }: { title: string; timeRange: TimeRange },
      { chessDataSource }: ChessContext
    ): Promise<Titled> => {
      return chessDataSource.getTitled({ title, timeRange });
    },
  },
};
