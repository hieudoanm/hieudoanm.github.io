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
import { ChessResult, Prisma } from '@prisma/client';
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
  const sql: Prisma.Sql = Prisma.raw(averageQuery);
  return sql;
};

const getAccuracyByResults = async ({
  averageClause,
  whereClause,
  username,
}: {
  averageClause: string;
  whereClause: string;
  username: string;
}): Promise<{ win: number; draw: number; loss: number }> => {
  const winQuery = buildAccuracyByResultsQuery(
    { averageClause, whereClause, username },
    CHESS_WIN_RESULTS
  );
  const drawQuery = buildAccuracyByResultsQuery(
    { averageClause, whereClause, username },
    CHESS_DRAW_RESULTS
  );
  const lossQuery = buildAccuracyByResultsQuery(
    { averageClause, whereClause, username },
    CHESS_LOSS_RESULTS
  );
  const [
    [{ average: win = 0 }],
    [{ average: draw = 0 }],
    [{ average: loss = 0 }],
  ] = await getPrismaClient().$transaction([
    getPrismaClient().$queryRaw<{ average: number }[]>(winQuery),
    getPrismaClient().$queryRaw<{ average: number }[]>(drawQuery),
    getPrismaClient().$queryRaw<{ average: number }[]>(lossQuery),
  ]);

  return { win, draw, loss };
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
}: {
  averageClause: string;
  whereClause: string;
}): Promise<{
  average: number;
  periods: AccuracyByPeriodDto[];
  timeOfDays: AccuracyByTimeOfDayDto[];
  daysOfWeek: AccuracyByDayOfWeekDto[];
}> => {
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
    periods = [],
    timeOfDaysList = [],
    daysOfWeekList = [],
  ] = await getPrismaClient().$transaction([
    getPrismaClient().$queryRaw<{ average: number }[]>(averageAccuracyQuery),
    getPrismaClient().$queryRaw<AccuracyByPeriodDto[]>(
      averageAccuracyByPeriodsQuery
    ),
    getPrismaClient().$queryRaw<{ average: number; timeOfDayIndex: number }[]>(
      averageAccuracyByTimeOfDaysQuery
    ),
    getPrismaClient().$queryRaw<{ average: number; dayOfWeekIndex: number }[]>(
      averageAccuracyByDaysOfWeekQuery
    ),
  ]);
  return {
    average,
    periods,
    timeOfDays: timeOfDaysList.map(
      ({ average: averageOfTimeOfDays, timeOfDayIndex }) => ({
        average: averageOfTimeOfDays,
        timeOfDay: Array.from(TIME_OF_DAYS)[`${timeOfDayIndex}`],
      })
    ),
    daysOfWeek: daysOfWeekList.map(
      ({ average: averageOfDaysOfWeek, dayOfWeekIndex }) => ({
        average: averageOfDaysOfWeek,
        dayOfWeek: Array.from(DAYS_OF_WEEK)[`${dayOfWeekIndex}`],
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
    periods = [],
    timeOfDays = [],
    daysOfWeek = [],
  } = await getAverageAccuracy({ averageClause, whereClause });
  const {
    win = 0,
    draw = 0,
    loss = 0,
  } = await getAccuracyByResults({
    averageClause,
    whereClause,
    username,
  });
  return { average, win, draw, loss, periods, timeOfDays, daysOfWeek };
};
