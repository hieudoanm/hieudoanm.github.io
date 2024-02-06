import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
  CHESS_WIN_RESULTS,
} from '@chess/common/constants/chess.constants';
import {
  DAYS_OF_WEEK,
  TIME_OF_DAYS,
} from '@chess/common/constants/time.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import {
  ChessResult,
  ChessTimeClass,
  ChessVariant,
  Prisma,
} from '@prisma/client';
import {
  AverageByColumn,
  CountByColumn,
  GamesByDayOfWeek,
  GamesByTimeOfDay,
  GamesByYear,
  Insights,
  Opponent,
  ResultsByDayOfWeek,
  ResultsByTimeOfDay,
} from './model';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const FROM_CLAUSE = 'FROM chess."ChessGame" as g';

const buildWhereClause = ({
  username = '',
  results = [],
  accuracy = false,
  variant = ChessVariant.chess,
  timeClass = ChessTimeClass.blitz,
  rated = true,
}: {
  username?: string;
  variant?: ChessVariant;
  accuracy?: boolean;
  timeClass?: ChessTimeClass;
  results?: ChessResult[];
  rated: boolean;
}) => {
  let whereResultsClause = '';
  if (results.length > 0) {
    const resultsString: string = results
      .map((result: ChessResult) => `'${result}'`)
      .join(',');
    whereResultsClause = results.includes(ChessResult.win)
      ? `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END) in (${resultsString})`
      : `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${resultsString})`;
  }

  const whereAccuracyClause: string = accuracy
    ? `g."whiteAccuracy" != 0 AND g."blackAccuracy" != 0`
    : '';

  const whereUsernameClause: string =
    username.length > 0
      ? `(g."whiteUsername"='${username}' OR g."blackUsername"='${username}')`
      : '';

  const whereTimeClassClause: string = timeClass
    ? `g."timeClass" = '${timeClass}'`
    : '';

  const whereRuleClause: string = variant ? `g."rules" = '${variant}'` : '';

  const whereRatedClause: string = rated ? `g."rated" = true` : '';

  const whereClauses: string[] = [
    whereTimeClassClause,
    whereAccuracyClause,
    whereUsernameClause,
    whereResultsClause,
    whereRatedClause,
    whereRuleClause,
  ];

  return `WHERE ${whereClauses
    .filter((clause: string) => clause !== '')
    .join(' AND ')}`;
};

const buildWhereInput = ({
  username = '',
  results = [],
  timeClass = 'blitz',
  variant = ChessVariant.chess,
  rated = true,
}: {
  username?: string;
  variant?: ChessVariant;
  results?: ChessResult[];
  timeClass?: ChessTimeClass;
  rated?: boolean;
} = {}): Prisma.ChessGameWhereInput => {
  const whereResults =
    results.length > 0
      ? {
          OR: [
            { whiteUsername: username, whiteResult: { in: results } },
            { blackUsername: username, blackResult: { in: results } },
          ],
        }
      : { OR: [{ whiteUsername: username }, { blackUsername: username }] };
  return {
    ...whereResults,
    rated,
    rules: variant,
    timeClass: timeClass,
  };
};

const buildAverageClause = (username: string) =>
  `AVG(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteAccuracy" ELSE g."blackAccuracy" END) as "average"`;

const buildFunctionQuery = ({
  sqlFunction = 'count',
  column = '',
  accuracy = false,
  username = '',
  variant = ChessVariant.chess,
  timeClass = ChessTimeClass.blitz,
  results = [],
  rated = true,
}: {
  sqlFunction?: 'count' | 'avg';
  column?: 'year' | 'timeOfDay' | 'dayOfWeek' | 'result' | '';
  accuracy?: boolean;
  username?: string;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
  results?: ChessResult[];
  rated?: boolean;
}): Prisma.Sql => {
  // SELECT
  const countClause: string = 'COUNT(*) as "count"';
  const averageClause: string = buildAverageClause(username);
  const functionClause: string =
    sqlFunction === 'count' ? countClause : averageClause;
  const columnClauses: Record<string, string> = {
    year: 'extract(year from g."endTime")::int',
    dayOfWeek: `extract(dow from g."endTime")`,
    timeOfDay: `floor(extract(hour from g."endTime") / 6.0)::int`,
    result: `CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END`,
  };
  const columnClause: string =
    column.length > 0 ? `${columnClauses[column]} as "column"` : '';
  const selectClauses: string = [functionClause, columnClause]
    .filter((clause) => clause !== '')
    .join(', ');
  const selectClause: string = `SELECT ${selectClauses}`;
  // FROM
  const fromClause: string = `FROM chess."ChessGame" as g`;
  // WHERE
  const options = { accuracy, username, results, variant, timeClass, rated };
  const whereClause: string = buildWhereClause(options);
  // GROUP BY
  const groupByClause: string = column.length > 0 ? `GROUP BY "column"` : '';
  const orderByClause: string = column.length > 0 ? `ORDER BY "column"` : '';
  // QUERY
  const query: string =
    `${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause}`.trim();
  logger.info(
    { username, variant, timeClass, column, results, accuracy, sqlFunction },
    `buildFunctionQuery query=${query}`
  );
  return Prisma.raw(query);
};

const buildOpponentsQuery = ({
  username = '',
  limit = 100,
  variant = ChessVariant.chess,
  timeClass = ChessTimeClass.blitz,
  rated = true,
}: {
  username?: string;
  limit?: number;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
  rated?: boolean;
}): Prisma.Sql => {
  const winResults: string = CHESS_WIN_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const drawResults: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const lossResults: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectOpponentClause: string = `(CASE WHEN g."whiteUsername" = '${username}' THEN g."blackUsername" ELSE g."whiteUsername" END) as "opponent"`;
  const selectCountGamesClause: string = 'COUNT(*) as "games"';
  const selectCountWinClause: string = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${winResults})) as "win"`;
  const selectCountDrawClause: string = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawResults})) as "draw"`;
  const selectCountLossClause: string = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossResults})) as "loss"`;
  const selectClause: string = `SELECT ${selectOpponentClause}, ${selectCountGamesClause}, ${selectCountWinClause}, ${selectCountDrawClause}, ${selectCountLossClause}`;
  // WHERE
  const options = { username, variant, timeClass, rated };
  const whereClause: string = buildWhereClause(options);
  // GROUP BY and ORDER BY and LIMIT
  const groupByClause: string = 'GROUP BY "opponent"';
  const orderByClause: string = 'ORDER BY "games" DESC';
  const limitClause: string = `LIMIT ${limit}`;
  // QUERY
  const query = `${selectClause} ${FROM_CLAUSE} ${whereClause} ${groupByClause} ${orderByClause} ${limitClause};`;
  logger.info(
    { username, timeClass, variant },
    `buildOpponentsQuery query=${query}`
  );
  return Prisma.raw(query);
};

export const getInsights = async ({
  username,
  variant = ChessVariant.chess,
  timeClass = ChessTimeClass.blitz,
  rated = true,
}: {
  username: string;
  variant: ChessVariant;
  timeClass: ChessTimeClass;
  rated: boolean;
}): Promise<Insights> => {
  const prismaClient = getPrismaClient();
  const baseOptions = { username, timeClass, variant, rated };
  // Accuracy
  const averageAccuracyQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
  });
  const averageAccuracyByWinResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_WIN_RESULTS,
  });
  const averageAccuracyByDrawResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_DRAW_RESULTS,
  });
  const averageAccuracyByLossResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_LOSS_RESULTS,
  });
  const averageAccuracyByYearsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    column: 'year',
  });
  const averageAccuracyByTimeOfDaysQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    column: 'timeOfDay',
  });
  const averageAccuracyByDaysOfWeekQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    sqlFunction: 'avg',
    accuracy: true,
    column: 'dayOfWeek',
  });
  // Games
  const totalGamesWhere: Prisma.ChessGameWhereInput =
    buildWhereInput(baseOptions);
  const winGamesWhere: Prisma.ChessGameWhereInput = buildWhereInput({
    ...baseOptions,
    results: CHESS_WIN_RESULTS,
  });
  const drawGamesWhere: Prisma.ChessGameWhereInput = buildWhereInput({
    ...baseOptions,
    results: CHESS_DRAW_RESULTS,
  });
  const lossGamesWhere: Prisma.ChessGameWhereInput = buildWhereInput({
    ...baseOptions,
    results: CHESS_LOSS_RESULTS,
  });
  const gamesByYearsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'year',
  });
  const gamesByTimeOfDaysQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'timeOfDay',
  });
  const gamesByDaysOfWeekQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'dayOfWeek',
  });
  // Opponents
  const opponentsQuery = buildOpponentsQuery({
    ...baseOptions,
    limit: 100,
  });
  // Results
  const winResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'result',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'result',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'result',
    results: CHESS_LOSS_RESULTS,
  });
  const winResultsByTimeOfDaysQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'timeOfDay',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsByTimeOfDaysQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'timeOfDay',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsByTimeOfDaysQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'timeOfDay',
    results: CHESS_LOSS_RESULTS,
  });
  const winResultsByDaysOfWeekQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'dayOfWeek',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsByDaysOfWeekQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'dayOfWeek',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsByDaysOfWeekQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    column: 'dayOfWeek',
    results: CHESS_LOSS_RESULTS,
  });
  const [
    [{ average = 0 }],
    [{ average: win = 0 }],
    [{ average: draw = 0 }],
    [{ average: loss = 0 }],
    averageAccuracyByYearsList = [],
    averageAccuracyByTimeOfDaysList = [],
    averageAccuracyByDaysOfWeekList = [],
    opponents = [],
    totalGames = 0,
    winGames = 0,
    drawGames = 0,
    lossGames = 0,
    gamesByYearsList = [],
    gamesByTimeOfDaysList = [],
    gamesByDaysOfWeekList = [],
    winResults = [],
    drawResults = [],
    lossResults = [],
    winResultsByTimeOfDays = [],
    drawResultsByTimeOfDays = [],
    lossResultsByTimeOfDays = [],
    winResultsByDaysOfWeek = [],
    drawResultsByDaysOfWeek = [],
    lossResultsByDaysOfWeek = [],
  ] = await prismaClient.$transaction([
    // Accuracy
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQuery),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyByWinResultsQuery),
    prismaClient.$queryRaw<AverageByColumn[]>(
      averageAccuracyByDrawResultsQuery
    ),
    prismaClient.$queryRaw<AverageByColumn[]>(
      averageAccuracyByLossResultsQuery
    ),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyByYearsQuery),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyByTimeOfDaysQuery),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyByDaysOfWeekQuery),
    // Opponents
    prismaClient.$queryRaw<Opponent[]>(opponentsQuery),
    // Games
    prismaClient.chessGame.count({ where: totalGamesWhere }),
    prismaClient.chessGame.count({ where: winGamesWhere }),
    prismaClient.chessGame.count({ where: drawGamesWhere }),
    prismaClient.chessGame.count({ where: lossGamesWhere }),
    prismaClient.$queryRaw<CountByColumn[]>(gamesByYearsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(gamesByTimeOfDaysQuery),
    prismaClient.$queryRaw<CountByColumn[]>(gamesByDaysOfWeekQuery),
    // Results
    prismaClient.$queryRaw<CountByColumn[]>(winResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(winResultsByTimeOfDaysQuery),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsByTimeOfDaysQuery),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsByTimeOfDaysQuery),
    prismaClient.$queryRaw<CountByColumn[]>(winResultsByDaysOfWeekQuery),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsByDaysOfWeekQuery),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsByDaysOfWeekQuery),
  ]);
  // Accuracy
  const accuracy = {
    average,
    win,
    draw,
    loss,
    periods: averageAccuracyByYearsList.map(({ average, column }) => ({
      average,
      period: column,
    })),
    timeOfDays: averageAccuracyByTimeOfDaysList.map(
      ({ average: averageOfTimeOfDays, column }) => ({
        average: averageOfTimeOfDays,
        timeOfDay: [...TIME_OF_DAYS][`${column}`],
      })
    ),
    daysOfWeek: averageAccuracyByDaysOfWeekList.map(
      ({ average: averageOfDaysOfWeek, column }) => ({
        average: averageOfDaysOfWeek,
        dayOfWeek: [...DAYS_OF_WEEK][`${column}`],
      })
    ),
  };
  // Games
  const gamesByYears: GamesByYear[] = gamesByYearsList.map(
    ({ count: games = 0, column = 0 }) => ({
      games,
      period: column,
    })
  );

  const gamesByTimeOfDays: GamesByTimeOfDay[] = gamesByTimeOfDaysList.map(
    ({ count: games = 0, column = 0 }) => ({
      games,
      timeOfDay: [...TIME_OF_DAYS][`${column}`],
    })
  );

  const gamesByDaysOfWeek: GamesByDayOfWeek[] = gamesByDaysOfWeekList.map(
    ({ count: games = 0, column = 0 }) => ({
      games,
      dayOfWeek: [...DAYS_OF_WEEK][`${column}`],
    })
  );

  const games = {
    total: totalGames,
    win: winGames,
    draw: drawGames,
    loss: lossGames,
    periods: gamesByYears,
    timeOfDays: gamesByTimeOfDays,
    daysOfWeek: gamesByDaysOfWeek,
  };

  // Results

  const resultsByTimeOfDays: ResultsByTimeOfDay[] = winResultsByTimeOfDays.map(
    ({ count: win, column }) => {
      const timeOfDay: string = [...TIME_OF_DAYS][
        `${Number.parseInt(column.toString())}`
      ];
      const { count: draw = 0 } = drawResultsByTimeOfDays.find(
        ({ column: drawColumn }) => drawColumn.toString() === column.toString()
      ) ?? { draw: 0 };
      const { count: loss = 0 } = lossResultsByTimeOfDays.find(
        ({ column: lossColumn }) => lossColumn.toString() === column.toString()
      ) ?? { count: 0 };
      return { timeOfDay, win, draw, loss };
    }
  );

  const resultsByDaysOfWeek: ResultsByDayOfWeek[] = winResultsByDaysOfWeek.map(
    ({ count: win, column }) => {
      const dayOfWeek: string = [...DAYS_OF_WEEK][
        `${Number.parseInt(column.toString())}`
      ];
      const { count: draw = 0 } = drawResultsByDaysOfWeek.find(
        ({ column: drawColumn }) => drawColumn.toString() === column.toString()
      ) ?? { draw: 0 };
      const { count: loss = 0 } = lossResultsByDaysOfWeek.find(
        ({ column: lossColumn }) => lossColumn.toString() === column.toString()
      ) ?? { count: 0 };
      return { dayOfWeek, win, draw, loss };
    }
  );
  const results = {
    win: winResults.map(({ column, count }) => ({
      result: column.toString(),
      count,
    })),
    draw: drawResults.map(({ column, count }) => ({
      result: column.toString(),
      count,
    })),
    loss: lossResults.map(({ column, count }) => ({
      result: column.toString(),
      count,
    })),
    timeOfDays: resultsByTimeOfDays,
    daysOfWeek: resultsByDaysOfWeek,
  };
  // Disconect
  await prismaClient.$disconnect();
  return { username, accuracy, games, opponents, results };
};
