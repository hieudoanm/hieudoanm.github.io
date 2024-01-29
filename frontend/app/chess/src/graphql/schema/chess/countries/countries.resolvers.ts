import { logger } from '@chess/common/libs/logger';
import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { TitledCountry } from '@chess/graphql/data/chess.types';
import { ChessCountry, ChessTitleAbbreviation } from '@prisma/client';

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
      { title }: { title?: ChessTitleAbbreviation },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<TitledCountry[]> => {
      return chessDataSource.getTitledCountries({ title });
    },
    titledCountry: async (
      _parent: unknown,
      { code, title }: { code: string; title?: ChessTitleAbbreviation },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<TitledCountry> => {
      logger.info(`titledCountry code=${code} title=${title}`);
      return chessDataSource.getTitledCountry({ code, title });
    },
  },
};
