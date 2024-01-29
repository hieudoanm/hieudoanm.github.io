import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { TitledCountry } from '@chess/graphql/data/chess.types';
import { ChessCountry } from '@prisma/client';

export const resolvers = {
  Chess: {
    countries: async (
      _parent: unknown,
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessCountry[]> => {
      return chessDataSource.getCountries();
    },
    titledCountries: async (
      _parent: unknown,
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<TitledCountry[]> => {
      return chessDataSource.getTitledCountries();
    },
    titledCountry: async (
      _parent: unknown,
      { code }: { code: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<TitledCountry> => {
      return chessDataSource.getTitledCountry(code);
    },
  },
};
