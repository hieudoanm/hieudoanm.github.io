import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { GamesSynced, PlayersResponse } from '@chess/graphql/data/chess.types';
import { ChessGame, ChessPlayer, ChessTitleAbbreviation } from '@prisma/client';

export const resolvers = {
  Chess: {
    players: async (
      _parent: unknown,
      {
        limit = 100,
        offset = 0,
        title,
        countryCode = '',
        isStreamer = false,
      }: {
        limit: number;
        offset: number;
        title: ChessTitleAbbreviation;
        countryCode: string;
        isStreamer: boolean;
      },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<PlayersResponse> => {
      const {
        countries = [],
        players = [],
        titles = [],
        total = 0,
      } = await chessDataSource.getPlayers({
        limit,
        offset,
        title,
        isStreamer,
        countryCode,
      });
      return { total, countries, players, titles };
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
      return chessDataSource.syncPlayerGames(username, { year, month });
    },
  },
  Player: {
    games: async (
      { username }: { username: string },
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<ChessGame[]> => {
      const { games = [] } = await chessDataSource.getPlayerGames(username);
      return games;
    },
  },
};
