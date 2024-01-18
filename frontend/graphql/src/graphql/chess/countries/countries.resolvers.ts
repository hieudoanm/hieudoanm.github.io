import { Country, CountryTotal } from '../../../common/data/chess/chess.types';
import { ChessContext } from '../chess.types';

export const resolvers = {
  Chess: {
    countries: async (
      _parent: unknown,
      _arguments: unknown,
      { chessDataSource }: ChessContext
    ): Promise<CountryTotal[]> => {
      return chessDataSource.getCountries();
    },
    country: async (
      _parent: unknown,
      { code }: { code: string },
      { chessDataSource }: ChessContext
    ): Promise<Country> => {
      return chessDataSource.getCountry(code);
    },
  },
};
