import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
  CHESS_WIN_RESULTS,
} from '@chess/common/constants/chess.constants';
import {
  DAYS_OF_WEEK,
  RULE,
  TIME_OF_DAYS,
} from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessResult,
  ChessVariant,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import {
  GamesByDayOfWeekDto,
  GamesByPeriodDto,
  GamesByTimeOfDayDto,
  GamesDto,
} from './model';

const buildGameResultsWhereInput = (
  username: string,
  results: ChessResult[]
) => {
  return {
    OR: [
      { whiteUsername: username, whiteResult: { in: results } },
      { blackUsername: username, blackResult: { in: results } },
    ],
  };
};

const buildGameWhereInput = (
  options: Prisma.ChessGameWhereInput
): Prisma.ChessGameWhereInput => {
  return { ...options, rated: true, rules: ChessVariant.chess };
};

const getNumberOfGames = async (username: string) => {
  const prismaClient: PrismaClient = getPrismaClient();
  const totalWhere: Prisma.ChessGameWhereInput = buildGameWhereInput({
    OR: [{ whiteUsername: username }, { blackUsername: username }],
  });
  const winWhere: Prisma.ChessGameWhereInput = buildGameWhereInput(
    buildGameResultsWhereInput(username, CHESS_WIN_RESULTS)
  );
  const drawWhere: Prisma.ChessGameWhereInput = buildGameWhereInput(
    buildGameResultsWhereInput(username, CHESS_DRAW_RESULTS)
  );
  const lossWhere: Prisma.ChessGameWhereInput = buildGameWhereInput(
    buildGameResultsWhereInput(username, CHESS_LOSS_RESULTS)
  );
  const gamesByPeriodsQuery: Prisma.Sql = buildGamesByPeriodsQuery(username);
  const gamesByTimeOfDaysQuery: Prisma.Sql =
    buildGamesByTimeOfDaysQuery(username);
  const gamesByDaysOfWeekQuery: Prisma.Sql = buildGamesByDaysOfWeek(username);
  const [
    total = 0,
    win = 0,
    draw = 0,
    loss = 0,
    periods = [],
    timeOfDaysList = [],
    daysOfWeekList = [],
  ] = await prismaClient.$transaction([
    prismaClient.chessGame.count({ where: totalWhere }),
    prismaClient.chessGame.count({ where: winWhere }),
    prismaClient.chessGame.count({ where: drawWhere }),
    prismaClient.chessGame.count({ where: lossWhere }),
    prismaClient.$queryRaw<GamesByPeriodDto[]>(gamesByPeriodsQuery),
    prismaClient.$queryRaw<{ games: number; timeOfDayIndex: number }[]>(
      gamesByTimeOfDaysQuery
    ),
    prismaClient.$queryRaw<{ games: number; dayOfWeekIndex: number }[]>(
      gamesByDaysOfWeekQuery
    ),
  ]);

  const timeOfDays: GamesByTimeOfDayDto[] = timeOfDaysList.map(
    ({ games = 0, timeOfDayIndex = 0 }) => ({
      games,
      timeOfDay: [...TIME_OF_DAYS][`${timeOfDayIndex}`],
    })
  );
  const daysOfWeek: GamesByDayOfWeekDto[] = daysOfWeekList.map(
    ({ games = 0, dayOfWeekIndex = 0 }) => ({
      games,
      dayOfWeek: [...DAYS_OF_WEEK][`${dayOfWeekIndex}`],
    })
  );

  return { total, win, draw, loss, periods, timeOfDays, daysOfWeek };
};

const buildGamesByPeriodsQuery = (username: string): Prisma.Sql => {
  const selectClause =
    'SELECT COUNT(*) as "games", extract(year from g."endTime")::int as "period"';
  const groupByClause = 'GROUP BY extract(year from g."endTime")';
  const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
  const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
  logger.info(`buildGamesByPeriodsQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildGamesByTimeOfDaysQuery = (username: string): Prisma.Sql => {
  const selectClause =
    'SELECT COUNT(*) as "games", floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex"';
  const groupByClause = 'GROUP BY "timeOfDayIndex"';
  const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
  const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
  logger.info(`buildGamesByTimeOfDaysQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildGamesByDaysOfWeek = (username: string): Prisma.Sql => {
  const selectClause =
    'SELECT COUNT(*) as "games", extract(dow from g."endTime") as "dayOfWeekIndex"';
  const groupByClause = 'GROUP BY "dayOfWeekIndex"';
  const whereClause = `WHERE (g."whiteUsername"='${username}' OR g."blackUsername"='${username}') AND g."rules" = '${RULE}' AND g."rated" = true`;
  const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause}`;
  logger.info(`buildGamesByDaysOfWeek query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

export const getGames = async (username: string): Promise<GamesDto> => {
  const {
    total = 0,
    win = 0,
    draw = 0,
    loss = 0,
    periods = [],
    timeOfDays = [],
    daysOfWeek = [],
  } = await getNumberOfGames(username);
  return { total, win, draw, loss, periods, timeOfDays, daysOfWeek };
};
