import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
} from '@chess/common/constants/chess.constants';
import {
  DAYS_OF_WEEK,
  TIME_OF_DAYS,
} from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessResult, Prisma, PrismaClient } from '@prisma/client';
import {
  ResultDto,
  ResultsByDayOfWeekDto,
  ResultsByTimeOfDayDto,
  ResultsDto,
} from './model';

const FROM_CLAUSE: string = 'FROM chess."ChessGame" as g';

const buildWinResultsByDaysOfWeekQuery = (username: string): Prisma.Sql => {
  const selectClause =
    'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "win"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} GROUP BY "dayOfWeekIndex";`;
  logger.info(`buildWinResultsByDaysOfWeekQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildDrawResultsByDaysOfWeekQuery = (username: string): Prisma.Sql => {
  const drawList: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause =
    'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "draw"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = 'GROUP BY "dayOfWeekIndex"';
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause};`;
  logger.info(`buildDrawResultsByDaysOfWeekQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildLossResultsByDaysOfWeekQuery = (username: string): Prisma.Sql => {
  const lossList: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause =
    'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "loss"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = 'GROUP BY "dayOfWeekIndex"';
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause};`;
  logger.info(`buildLossResultsByDaysOfWeekQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildWinResultsByTimeOfDaysQuery = (username: string): Prisma.Sql => {
  const selectClause =
    'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "win"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} GROUP BY "timeOfDayIndex";`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildDrawResultsByTimeOfDaysQuery = (username: string): Prisma.Sql => {
  const drawList: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause =
    'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "draw"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = 'GROUP BY "timeOfDayIndex"';
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause};`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildLossResultsByTimeOfDaysQuery = (username: string): Prisma.Sql => {
  const lossList: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause =
    'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "loss"';
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = 'GROUP BY "timeOfDayIndex"';
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause};`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const getResultsByTimeOfDays = async (
  username: string
): Promise<{
  win: ResultDto[];
  draw: ResultDto[];
  loss: ResultDto[];
  timeOfDays: ResultsByTimeOfDayDto[];
  daysOfWeek: ResultsByDayOfWeekDto[];
}> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const winResultsQuery: Prisma.Sql = buildWinResultsQuery(username);
  const drawResultsQuery: Prisma.Sql = buildDrawResultsQuery(username);
  const lossResultsQuery: Prisma.Sql = buildLossResultsQuery(username);
  const winResultsByTimeOfDaysQuery: Prisma.Sql =
    buildWinResultsByTimeOfDaysQuery(username);
  const drawResultsByTimeOfDaysQuery: Prisma.Sql =
    buildDrawResultsByTimeOfDaysQuery(username);
  const lossResultsByTimeOfDaysQuery: Prisma.Sql =
    buildLossResultsByTimeOfDaysQuery(username);
  const winResultsByDaysOfWeekQuery =
    buildWinResultsByDaysOfWeekQuery(username);
  const drawResultsByDaysOfWeekQuery =
    buildDrawResultsByDaysOfWeekQuery(username);
  const lossResultsByDaysOfWeekQuery =
    buildLossResultsByDaysOfWeekQuery(username);
  const [
    win = [],
    draw = [],
    loss = [],
    winResultsByTimeOfDays = [],
    drawResultsByTimeOfDays = [],
    lossResultsByTimeOfDays = [],
    winResultsByDaysOfWeek = [],
    drawResultsByDaysOfWeek = [],
    lossResultsByDaysOfWeek = [],
  ] = await prismaClient.$transaction([
    prismaClient.$queryRaw<ResultDto[]>(winResultsQuery),
    prismaClient.$queryRaw<ResultDto[]>(drawResultsQuery),
    prismaClient.$queryRaw<ResultDto[]>(lossResultsQuery),
    prismaClient.$queryRaw<{ win: number; timeOfDayIndex: number }[]>(
      winResultsByTimeOfDaysQuery
    ),
    prismaClient.$queryRaw<{ draw: number; timeOfDayIndex: number }[]>(
      drawResultsByTimeOfDaysQuery
    ),
    prismaClient.$queryRaw<{ loss: number; timeOfDayIndex: number }[]>(
      lossResultsByTimeOfDaysQuery
    ),
    prismaClient.$queryRaw<{ win: number; dayOfWeekIndex: number }[]>(
      winResultsByDaysOfWeekQuery
    ),
    prismaClient.$queryRaw<{ draw: number; dayOfWeekIndex: number }[]>(
      drawResultsByDaysOfWeekQuery
    ),
    prismaClient.$queryRaw<{ loss: number; dayOfWeekIndex: number }[]>(
      lossResultsByDaysOfWeekQuery
    ),
  ]);

  const timeOfDays = winResultsByTimeOfDays.map(
    ({ win, timeOfDayIndex: winTimeOfDayIndex }) => {
      const timeOfDay: string = [...TIME_OF_DAYS][`${winTimeOfDayIndex}`];
      const { draw = 0 } = drawResultsByTimeOfDays.find(
        ({ timeOfDayIndex: drawTimeOfDayIndex }) =>
          drawTimeOfDayIndex === winTimeOfDayIndex
      ) ?? { draw: 0 };
      const { loss = 0 } = lossResultsByTimeOfDays.find(
        ({ timeOfDayIndex: lossTimeOfDayIndex }) =>
          lossTimeOfDayIndex === winTimeOfDayIndex
      ) ?? { draw: 0 };
      return { timeOfDay, win, draw, loss };
    }
  );

  const daysOfWeek = winResultsByDaysOfWeek.map(
    ({ win, dayOfWeekIndex: winDayOfWeekIndex }) => {
      const dayOfWeek: string = [...DAYS_OF_WEEK][`${winDayOfWeekIndex}`];
      const { draw = 0 } = drawResultsByDaysOfWeek.find(
        ({ dayOfWeekIndex: drawDayOfWeekIndex }) =>
          drawDayOfWeekIndex === winDayOfWeekIndex
      ) ?? { draw: 0 };
      const { loss = 0 } = lossResultsByDaysOfWeek.find(
        ({ dayOfWeekIndex: lossDayOfWeekIndex }) =>
          lossDayOfWeekIndex === winDayOfWeekIndex
      ) ?? { draw: 0 };
      return { dayOfWeek, win, draw, loss };
    }
  );

  return { win, draw, loss, timeOfDays, daysOfWeek };
};

const buildWinResultsQuery = (username: string): Prisma.Sql => {
  const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END) as "count"`;
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END`;
  const orderByClause = `ORDER BY "count" DESC`;
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause} ${orderByClause};`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildDrawResultsQuery = (username: string): Prisma.Sql => {
  const drawList: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "count"`;
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END`;
  const orderByClause = `ORDER BY "count" DESC`;
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause} ${orderByClause};`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildLossResultsQuery = (username: string): Prisma.Sql => {
  const lossList: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "count"`;
  const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END`;
  const orderByClause = `ORDER BY "count" DESC`;
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause} ${orderByClause};`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

export const getResults = async (username: string): Promise<ResultsDto> => {
  const { win, draw, loss, timeOfDays, daysOfWeek } =
    await getResultsByTimeOfDays(username);
  return { win, draw, loss, timeOfDays, daysOfWeek };
};
