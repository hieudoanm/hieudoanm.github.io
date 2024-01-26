import { ChessDataSource } from '@chess/graphql/data/chess.data';
import {
  ChessGame,
  ChessPlayer,
  GamesSynced,
} from '@chess/graphql/data/chess.types';

export const resolvers = {
  Chess: {
    players: (
      _parent: unknown,
      { limit = 100, offset = 0 }: { limit: number; offset: number },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ) => {
      return chessDataSource.getPlayers({ limit, offset });
    },
    player: (
      _parent: unknown,
      { username }: { username: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessPlayer> => {
      return chessDataSource.getPlayer(username);
    },
  },
  Mutation: {
    player: (
      _parent: unknown,
      { username }: { username: string },
      { chessDataSource }: { chessDataSource: ChessDataSource }
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
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<GamesSynced> => {
      return chessDataSource.syncGames(username, { year, month });
    },
  },
  Player: {
    games: async (
      { username }: { username: string },
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessGame[]> => {
      const { games = [] } = await chessDataSource.getGames(username);
      return games;
    },
  },
};
