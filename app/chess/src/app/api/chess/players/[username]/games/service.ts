import { Game } from '@chess/common/clients/chess.com/chess.dto';
import { getGamesByYearAndMonth } from '@chess/common/clients/chess.com/proxy.client';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessGame,
  ChessOpening,
  ChessPhrase,
  ChessResult,
  ChessTimeClass,
  ChessVariant,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { GamesResponse, SyncedResponse, TimeControl } from './dto';
import { Chess } from 'chess.js';
import { Move } from './[id]/model';
import { getNumberOfMajorAndMinorPieces } from './[id]/service';

const getTimeControl = ({
  timeClass,
  timeControl,
}: { timeClass: ChessTimeClass; timeControl: string }) => {
  if (timeClass === ChessTimeClass.daily) {
    const [_, secondsString] = timeControl.split('/');
    const seconds: number = Number.parseInt(secondsString);
    const days: number = seconds / 86_400;
    const unit: string = days === 1 ? 'Day' : 'Days';
    const timeControlDisplay: string = `${days} ${unit}`;
    return {
      timeClass,
      timeControl,
      timeControlMinutes: 0,
      timeControlSeconds: 0,
      timeControlExtra: 0,
      timeControlDisplay,
    };
  }
  const [mainSecondsString, extraSecondsString] = timeControl.split('+');
  const mainSeconds: number = Number.parseInt(mainSecondsString);
  const timeControlMinutes: number = mainSeconds < 60 ? 0 : mainSeconds / 60;
  const timeControlSeconds: number = mainSeconds < 60 ? mainSeconds : 0;
  const timeControlMain =
    mainSeconds < 60 ? `${timeControlSeconds} Seconds` : timeControlMinutes;
  // Extra
  const extraSeconds: number = Number.parseInt(extraSecondsString ?? '0');
  const timeControlExtra: number =
    extraSeconds < 60 ? extraSeconds : extraSeconds / 60;
  const timeControlDisplay: string = `${timeControlMain} | ${timeControlExtra}`;
  return {
    timeClass,
    timeControl,
    timeControlMinutes,
    timeControlSeconds,
    timeControlExtra,
    timeControlDisplay,
  };
};

const sortTimeControls = (timeControls: TimeControl[]): TimeControl[] => {
  timeControls.sort((a, b) => {
    if (a.timeClass !== b.timeClass) {
      return a.timeClass < b.timeClass ? 1 : -1;
    }
    if (a.timeControlMinutes !== b.timeControlMinutes) {
      return a.timeControlMinutes < b.timeControlMinutes ? 1 : -1;
    }
    if (a.timeControlSeconds !== b.timeControlSeconds) {
      return a.timeControlSeconds < b.timeControlSeconds ? 1 : -1;
    }
    return a.timeControlExtra < b.timeControlExtra ? 1 : -1;
  });
  return timeControls;
};

export const getChessGames = async (
  username: string,
  {
    limit = 100,
    offset = 0,
    month,
    year,
    opponent = '',
    timeClass,
    timeControl,
  }: {
    month?: number;
    year?: number;
    limit?: number;
    offset?: number;
    opponent?: string;
    timeClass?: ChessTimeClass;
    timeControl?: string;
  }
): Promise<GamesResponse> => {
  const prismaClient: PrismaClient = getPrismaClient();
  logger.info(`getGames month=${month} year=${year}`);
  let endTime = undefined;
  if (year) {
    endTime = {
      gte: new Date(year, 0, 1),
      lt: new Date(year + 1, 0, 1),
    };
    if (month) {
      endTime = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }
  }
  let where: Prisma.ChessGameWhereInput = {
    endTime,
    OR: [
      {
        whiteUsername: { equals: username, mode: 'insensitive' },
        blackUsername: opponent
          ? { equals: opponent, mode: 'insensitive' }
          : undefined,
      },
      {
        blackUsername: { equals: username, mode: 'insensitive' },
        whiteUsername: opponent
          ? { equals: opponent, mode: 'insensitive' }
          : undefined,
      },
    ],
  };
  if (timeClass) where = { ...where, timeClass };
  if (timeControl) where = { ...where, timeControl };

  const [timeClasses = [], timeControls = [], total = 0, games = []] =
    await prismaClient.$transaction([
      prismaClient.chessGame.findMany({
        distinct: ['timeClass'],
        select: { timeClass: true },
        orderBy: { timeClass: 'asc' },
      }),
      prismaClient.chessGame.findMany({
        distinct: ['timeClass', 'timeControl'],
        select: { timeClass: true, timeControl: true },
        orderBy: { timeClass: 'asc' },
        where: { timeClass },
      }),
      prismaClient.chessGame.count({
        where,
        take: limit,
        skip: offset,
      }),
      prismaClient.chessGame.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { endTime: 'desc' },
      }),
    ]);

  await prismaClient.$disconnect();

  return {
    timeClasses: timeClasses.map(({ timeClass }) => timeClass),
    timeControls: sortTimeControls(
      timeControls.map(({ timeClass, timeControl }) =>
        getTimeControl({ timeClass, timeControl })
      )
    ),
    total,
    games,
  };
};

const getGame = async (
  username: string,
  gameId: string
): Promise<ChessGame> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const where: Prisma.ChessGameWhereInput = {
    OR: [{ whiteUsername: username }, { blackUsername: username }],
    id: gameId,
  };
  const game: ChessGame = await prismaClient.chessGame.findFirstOrThrow({
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
  const prismaClient: PrismaClient = getPrismaClient();
  const upsertTransactions = games.map((game) => {
    const upsertArguments = {
      create: game,
      update: game,
      where: { id: game.id },
    };
    return prismaClient.chessGame.upsert(upsertArguments);
  });
  return prismaClient.$transaction(upsertTransactions);
};

const analyzeGame = async (game: Game) => {
  try {
    const chess = new Chess();
    chess.loadPgn(game.pgn);
    const newChess = new Chess();
    let moves: Move[] = chess.history().map((move: string, index: number) => {
      newChess.move(move);
      const fen: string = newChess.fen();
      const no: number = Math.floor(index / 2) + 1;
      const side: 'white' | 'black' = index % 2 === 0 ? 'white' : 'black';
      const numberOfMajorAndMinorPieces = getNumberOfMajorAndMinorPieces(fen);
      return {
        no,
        side,
        move,
        fen,
        eco: '',
        opening: '',
        phrase: null,
        numberOfMajorAndMinorPieces,
      };
    });
    const fens: string[] = moves.map(({ fen }) => fen);
    const prismaClient: PrismaClient = getPrismaClient();
    const openings: ChessOpening[] = await prismaClient.chessOpening.findMany({
      where: { fen: { in: fens } },
    });
    moves = moves.map((move: Move) => {
      const { fen, numberOfMajorAndMinorPieces } = move;
      const { eco = '', name: opening = '' } = openings.find(
        (opening) => opening.fen === fen
      ) ?? { eco: '', name: '' };
      let phrase: ChessPhrase =
        eco.length > 0 ? ChessPhrase.opening : ChessPhrase.middlegame;
      phrase = numberOfMajorAndMinorPieces <= 6 ? ChessPhrase.endgame : phrase;
      return { ...move, eco, opening, phrase };
    });
    const openingMoves = moves.filter(
      ({ eco, opening }) => eco !== '' && opening !== ''
    );
    const { eco, opening } = openingMoves.at(-1) ?? { eco: '', opening: '' };
    const { phrase: endPhrase } = moves.at(-1) ?? { phrase: '' as ChessPhrase };
    return { eco, opening, endPhrase };
  } catch (error) {
    logger.error(`analyzeGame uuid=${game.uuid} error=${error}`);
    return { eco: '', opening: '', endPhrase: null };
  }
};

const mapGames = async (chessGames: Game[]): Promise<ChessGame[]> => {
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
      const { eco, opening, endPhrase } = await analyzeGame(chessGame);
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
        eco,
        opening,
        endPhrase,
        createdAt: d,
        updatedAt: d,
      });
    } catch (error) {
      logger.error(`mapGames error=${error}`);
    }
  }
  return games;
};

const syncGamesByYearAndMonth = async ({
  username,
  year,
  month,
  full = false,
}: { username: string; year: number; month: number; full: boolean }): Promise<{
  total: number;
  synced: number;
  existed: number;
}> => {
  const { games: chessGames = [] } = await getGamesByYearAndMonth(
    username,
    year,
    month
  );
  if (!full) {
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
    const newGames: ChessGame[] = await mapGames(newChessGames);
    const games: (ChessGame | undefined)[] = await upsertGames(newGames);
    return {
      total: chessGames.length,
      existed: databaseGames.length,
      synced: games.length,
    };
  }
  const fullGames: ChessGame[] = await mapGames(chessGames);
  const games: (ChessGame | undefined)[] = await upsertGames(fullGames);
  return {
    total: chessGames.length,
    existed: 0,
    synced: games.length,
  };
};

export const syncGames = async ({
  username,
  month,
  year,
  full = false,
}: {
  username: string;
  month: number;
  year: number;
  full: boolean;
}): Promise<SyncedResponse> => {
  logger.info(`syncGames username=${username} month=${month} year=${year}`);
  const {
    total = 0,
    synced = 0,
    existed = 0,
  } = await syncGamesByYearAndMonth({ username, year, month, full });
  return { total, synced, existed };
};
