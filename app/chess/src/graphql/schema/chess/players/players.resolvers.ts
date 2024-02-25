import { TimeRange } from '@chess/common/types/time';
import { ChessDataSource } from '@chess/graphql/data/chess.data';
import { GamesSynced, PlayersResponse } from '@chess/graphql/data/chess.types';
import {
  ChessGame,
  ChessPlayer,
  ChessTimeClass,
  ChessTitleAbbreviation,
  ChessVariant,
} from '@prisma/client';

export const resolvers = {
  Chess: {
    players: async (
      _parent: unknown,
      {
        limit = 100,
        offset = 0,
        title,
        timeRange,
        countryCode = '',
        isStreamer = false,
      }: {
        limit: number;
        offset: number;
        timeRange: TimeRange;
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
        stats,
      } = await chessDataSource.getPlayers({
        title,
        limit,
        offset,
        timeRange,
        isStreamer,
        countryCode,
      });
      return { total, stats, countries, players, titles };
    },
    player: async (
      _parent: unknown,
      {
        username,
        timeClass = ChessTimeClass.blitz,
        variant = ChessVariant.chess,
      }: { username: string; timeClass: ChessTimeClass; variant: ChessVariant },
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ): Promise<
      ChessPlayer & { timeClass: ChessTimeClass; variant: ChessVariant }
    > => {
      const player = await chessDataSource.getPlayer(username);
      return { ...player, timeClass, variant };
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
    insights: async (
      {
        username,
        timeClass = ChessTimeClass.blitz,
        variant = ChessVariant.chess,
      }: { username: string; timeClass: ChessTimeClass; variant: ChessVariant },
      _arguments: unknown,
      { chessDataSource }: { chessDataSource: ChessDataSource }
    ) => {
      return chessDataSource.getPlayerInsights(username, {
        timeClass,
        variant,
      });
    },
  },
};
