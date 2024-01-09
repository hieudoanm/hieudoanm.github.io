import { ChessGame, ChessPlayer } from '@prisma/client';
import { ChessContext } from '../chess.types';
import { GamesSynced } from '../../../common/data/chess/chess.types';

export const resolvers = {
  Query: {
    player: (
      _parent: unknown,
      { username }: { username: string },
      { chessDataSource }: ChessContext
    ): Promise<ChessPlayer> => {
      return chessDataSource.getPlayer(username);
    },
  },
  Mutation: {
    player: (
      _parent: unknown,
      { username }: { username: string },
      { chessDataSource }: ChessContext
    ): Promise<ChessPlayer> => {
      return chessDataSource.syncPlayer(username);
    },
    games: (
      _parent: unknown,
      {
        username,
        month = new Date().getMonth() + 1,
        year = new Date().getFullYear(),
      }: { username: string; year: number; month: number },
      { chessDataSource }: ChessContext
    ): Promise<GamesSynced> => {
      return chessDataSource.syncGames(username, { year, month });
    },
  },
  Player: {
    games: async (
      { username }: { username: string },
      _arguments: unknown,
      { chessDataSource }: ChessContext
    ): Promise<ChessGame[]> => {
      const { games = [] } = await chessDataSource.getGames(username);
      return games;
    },
  },
};
