import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { Country } from '@chess/graphql/data/chess.types';

export const resolvers = {
  Chess: {
    countries: async (
      _parent: unknown,
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<Country[]> => {
      return chessDataSource.getCountries();
    },
    country: async (
      _parent: unknown,
      { code }: { code: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<Country> => {
      return chessDataSource.getCountry(code);
    },
  },
};
