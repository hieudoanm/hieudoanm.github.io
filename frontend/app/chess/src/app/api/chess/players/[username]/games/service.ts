import { Game } from '@chess/common/clients/chess.com/chess.dto';
import { getGamesByYearAndMonth } from '@chess/common/clients/chess.com/proxy.client';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessGame,
  ChessResult,
  ChessTimeClass,
  ChessVariant,
  Prisma,
} from '@prisma/client';
import { GamesResponse, SyncedResponse } from './dto';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export const getChessGames = async (
  username: string,
  {
    limit = 100,
    offset = 0,
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear(),
  }: { month: number; year: number; limit: number; offset: number }
): Promise<GamesResponse> => {
  logger.info(`getGames month=${month} year=${year}`);
  const where: Prisma.ChessGameWhereInput = {
    OR: [
      { whiteUsername: { equals: username, mode: 'insensitive' } },
      { blackUsername: { equals: username, mode: 'insensitive' } },
    ],
    endTime: {
      gte: new Date(year, month - 1, 1),
      lt: new Date(year, month, 1),
    },
  };
  const [total = 0, games = []] = await getPrismaClient().$transaction([
    getPrismaClient().chessGame.count({
      where,
      take: limit,
      skip: offset,
    }),
    getPrismaClient().chessGame.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { endTime: 'desc' },
    }),
  ]);

  await getPrismaClient().$disconnect();

  return { total, games };
};

const getGame = async (
  username: string,
  gameId: string
): Promise<ChessGame> => {
  const where: Prisma.ChessGameWhereInput = {
    OR: [{ whiteUsername: username }, { blackUsername: username }],
    id: gameId,
  };
  const game: ChessGame = await getPrismaClient().chessGame.findFirstOrThrow({
    where,
  });
  return game;
};

const getGamePGN = async (
  username: string,
  gameId: string
): Promise<string> => {
  const game: ChessGame = await getGame(username, gameId);
  return game.pgn || '';
};

const upsertGames = async (games: ChessGame[]): Promise<ChessGame[]> => {
  const upsertTransactions = games.map((game) => {
    const upsertArguments = {
      create: game,
      update: game,
      where: { id: game.id },
    };
    return getPrismaClient().chessGame.upsert(upsertArguments);
  });
  return getPrismaClient().$transaction(upsertTransactions);
};

const mapGames = (chessGames: Game[]): ChessGame[] => {
  const games: ChessGame[] = [];
  for (const chessGame of chessGames) {
    try {
      const {
        url = '',
        uuid: id = '',
        pgn = '',
        time_control: timeControl = '',
        end_time: endTime = 0,
        rated = false,
        tcn = '',
        initial_setup: initialSetup = '',
        fen = '',
        time_class: timeClass = '',
        rules = '',
        accuracies: { white: whiteAccuracy = 0, black: blackAccuracy = 0 } = {
          white: 0,
          black: 0,
        },
        white: {
          username: whiteUsername = '',
          result: whiteResult = '',
          rating: whiteRating = 0,
        } = {
          username: '',
          result: '',
          rating: 0,
        },
        black: {
          username: blackUsername = '',
          result: blackResult = '',
          rating: blackRating = 0,
        } = {
          username: '',
          result: '',
          rating: 0,
        },
      } = chessGame;
      const endDate: Date = new Date(endTime * 1000);
      const d: Date = new Date();
      const lowerWhiteUsername: string = whiteUsername.toLowerCase();
      const lowerBlackUsername: string = blackUsername.toLowerCase();
      const lowerWhiteResult: ChessResult =
        whiteResult.toLowerCase() as ChessResult;
      const lowerBlackResult: ChessResult =
        blackResult.toLowerCase() as ChessResult;
      games.push({
        url,
        id,
        pgn,
        timeControl,
        timeClass: timeClass as ChessTimeClass,
        endTime: endDate,
        rated,
        tcn,
        initialSetup,
        fen,
        rules: rules as ChessVariant,
        whiteUsername: lowerWhiteUsername,
        blackUsername: lowerBlackUsername,
        whiteResult: ChessResult[lowerWhiteResult],
        blackResult: ChessResult[lowerBlackResult],
        whiteAccuracy,
        blackAccuracy,
        whiteRating,
        blackRating,
        createdAt: d,
        updatedAt: d,
      });
    } catch (error) {
      logger.error(`mapGames error=${error}`);
    }
  }
  return games;
};

const syncGamesByYearAndMonth = async (
  username: string,
  year: number,
  month: number
): Promise<{
  total: number;
  synced: number;
  existed: number;
}> => {
  const { games: chessGames = [] } = await getGamesByYearAndMonth(
    username,
    year,
    month
  );
  const chessGameUuids: string[] = chessGames.map(({ uuid }) => uuid);
  const { games: databaseGames = [] } = await getChessGames(username, {
    year,
    month,
    offset: 0,
    limit: 1_000_000,
  });
  const databaseGameIds: Set<string> = new Set(
    databaseGames.map(({ id }) => id)
  );
  const newChessGameUuids: Set<string> = new Set(
    chessGameUuids.filter((uuid: string) => !databaseGameIds.has(uuid))
  );
  const newChessGames: Game[] = chessGames.filter(({ uuid }: Game) =>
    newChessGameUuids.has(uuid)
  );
  const newGames: ChessGame[] = mapGames(newChessGames);
  const games: (ChessGame | undefined)[] = await upsertGames(newGames);
  return {
    total: chessGames.length,
    existed: databaseGames.length,
    synced: games.length,
  };
};

export const syncGames = async (
  username: string,
  {
    month = new Date().getMonth() + 1,
    year = new Date().getFullYear(),
  }: { month: number; year: number }
): Promise<SyncedResponse> => {
  logger.info(`syncGames month=${month} year=${year}`);
  const {
    total = 0,
    synced = 0,
    existed = 0,
  } = await syncGamesByYearAndMonth(username, year, month);
  return { total, synced, existed };
};
