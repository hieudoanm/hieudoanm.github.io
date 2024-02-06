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
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessResult, Prisma, PrismaClient } from '@prisma/client';
import {
  AccuracyByDayOfWeekDto,
  AccuracyByPeriodDto,
  AccuracyByTimeOfDayDto,
  AccuracyDto,
} from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const buildAccuracyQuery =
  ({
    averageClause,
    whereClause,
    username,
  }: { averageClause: string; whereClause: string; username: string }) =>
  (results: ChessResult[] = []) => {
    const list: string = results.map((result) => `'${result}'`).join(',');
    const clause = `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${list})`;
    const averageQuery = `SELECT ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} AND ${clause}`;
    return Prisma.raw(averageQuery);
  };

const buildAccuracyByResultsQuery = (
  {
    averageClause,
    whereClause,
    username,
  }: { averageClause: string; whereClause: string; username: string },
  results: ChessResult[] = []
): Prisma.Sql => {
  const list: string = results.map((result) => `'${result}'`).join(',');
  const clause = `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${list})`;
  const averageQuery = `SELECT ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} AND ${clause}`;
  return Prisma.raw(averageQuery);
};

const buildAverageAccuracyQuery = ({
  averageClause,
  whereClause,
}: {
  averageClause: string;
  whereClause: string;
}) => {
  const averageQuery = `SELECT ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause}`;
  const sql: Prisma.Sql = Prisma.raw(averageQuery);
  return sql;
};

const buildAverageAccuracyByPeriods = ({
  averageClause,
  whereClause,
}: {
  averageClause: string;
  whereClause: string;
}): Prisma.Sql => {
  const groupByClause = `GROUP BY extract(year from g."endTime")`;
  const extractClause = 'extract(year from g."endTime")::int as "period"';
  const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildAverageAccuracyByTimeOfDays = ({
  averageClause,
  whereClause,
}: {
  averageClause: string;
  whereClause: string;
}): Prisma.Sql => {
  const groupByClause = `GROUP BY "timeOfDayIndex"`;
  const extractClause =
    'floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex"';
  const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const buildAverageAccuracyByDaysOfWeek = ({
  averageClause,
  whereClause,
}: {
  averageClause: string;
  whereClause: string;
}): Prisma.Sql => {
  const groupByClause = `GROUP BY "dayOfWeekIndex"`;
  const extractClause = 'extract(dow from g."endTime") as "dayOfWeekIndex"';
  const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

const getAverageAccuracy = async ({
  averageClause,
  whereClause,
  username,
}: {
  averageClause: string;
  whereClause: string;
  username: string;
}): Promise<{
  average: number;
  win: number;
  draw: number;
  loss: number;
  periods: AccuracyByPeriodDto[];
  timeOfDays: AccuracyByTimeOfDayDto[];
  daysOfWeek: AccuracyByDayOfWeekDto[];
}> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const buildAccuracyQueryByResults = buildAccuracyQuery({
    averageClause,
    whereClause,
    username,
  });
  const accuracyByWinResultsQuery: Prisma.Sql =
    buildAccuracyQueryByResults(CHESS_WIN_RESULTS);
  const accuracyQueryByDrawResults: Prisma.Sql =
    buildAccuracyQueryByResults(CHESS_DRAW_RESULTS);
  const accuracyQueryByLossResults: Prisma.Sql =
    buildAccuracyQueryByResults(CHESS_LOSS_RESULTS);
  const averageAccuracyQuery = buildAverageAccuracyQuery({
    averageClause,
    whereClause,
  });
  const averageAccuracyByPeriodsQuery = buildAverageAccuracyByPeriods({
    averageClause,
    whereClause,
  });
  const averageAccuracyByTimeOfDaysQuery = buildAverageAccuracyByTimeOfDays({
    averageClause,
    whereClause,
  });
  const averageAccuracyByDaysOfWeekQuery = buildAverageAccuracyByDaysOfWeek({
    averageClause,
    whereClause,
  });
  const [
    [{ average = 0 }],
    [{ average: win = 0 }],
    [{ average: draw = 0 }],
    [{ average: loss = 0 }],
    periods = [],
    timeOfDaysList = [],
    daysOfWeekList = [],
  ] = await prismaClient.$transaction([
    prismaClient.$queryRaw<{ average: number }[]>(averageAccuracyQuery),
    prismaClient.$queryRaw<{ average: number }[]>(accuracyByWinResultsQuery),
    prismaClient.$queryRaw<{ average: number }[]>(accuracyQueryByDrawResults),
    prismaClient.$queryRaw<{ average: number }[]>(accuracyQueryByLossResults),
    prismaClient.$queryRaw<AccuracyByPeriodDto[]>(
      averageAccuracyByPeriodsQuery
    ),
    prismaClient.$queryRaw<{ average: number; timeOfDayIndex: number }[]>(
      averageAccuracyByTimeOfDaysQuery
    ),
    prismaClient.$queryRaw<{ average: number; dayOfWeekIndex: number }[]>(
      averageAccuracyByDaysOfWeekQuery
    ),
  ]);
  return {
    average,
    win,
    draw,
    loss,
    periods,
    timeOfDays: timeOfDaysList.map(
      ({ average: averageOfTimeOfDays, timeOfDayIndex }) => ({
        average: averageOfTimeOfDays,
        timeOfDay: [...TIME_OF_DAYS][`${timeOfDayIndex}`],
      })
    ),
    daysOfWeek: daysOfWeekList.map(
      ({ average: averageOfDaysOfWeek, dayOfWeekIndex }) => ({
        average: averageOfDaysOfWeek,
        dayOfWeek: [...DAYS_OF_WEEK][`${dayOfWeekIndex}`],
      })
    ),
  };
};

export const getAccuracy = async (username: string): Promise<AccuracyDto> => {
  const averageClause = `AVG(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteAccuracy" ELSE g."blackAccuracy" END) as "average"`;
  const whereClause = `g."whiteAccuracy" != 0 AND g."blackAccuracy" != 0 AND g."rules" = '${RULE}' AND g."rated" = true`;
  // Average
  const {
    average = 0,
    win = 0,
    draw = 0,
    loss = 0,
    periods = [],
    timeOfDays = [],
    daysOfWeek = [],
  } = await getAverageAccuracy({ averageClause, whereClause, username });
  return { average, win, draw, loss, periods, timeOfDays, daysOfWeek };
};
