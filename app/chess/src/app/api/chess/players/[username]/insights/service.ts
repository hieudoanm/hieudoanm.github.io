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
  ResultsByOpponentRating,
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
  rated?: boolean;
}) => {
  let whereResultsClause = '';
  if (results.length > 0) {
    const resultsString: string = results
      .map((result: ChessResult) => `'${result}'`)
      .join(',');
    whereResultsClause = `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${resultsString})`;
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
  timeClass = ChessTimeClass.blitz,
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
  name = 'query',
  sqlFunction = 'count',
  column = '',
  accuracy = false,
  username = '',
  variant = ChessVariant.chess,
  timeClass = ChessTimeClass.blitz,
  results = [],
  rated = true,
}: {
  name?: string;
  sqlFunction?: 'count' | 'avg';
  column?: 'year' | 'timeOfDay' | 'dayOfWeek' | 'result' | 'opponent' | '';
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
    opponent: `floor((CASE WHEN g."whiteUsername" = '${username}' THEN g."blackRating" ELSE g."whiteRating" END) / 100)`,
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
  const options = {
    accuracy,
    username,
    results,
    variant,
    timeClass,
    rated,
  };
  const whereClause: string = buildWhereClause(options);
  // GROUP BY
  const groupByClause: string = column.length > 0 ? `GROUP BY "column"` : '';
  const orderByClause: string = column.length > 0 ? `ORDER BY "column"` : '';
  // QUERY
  const query: string =
    `${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause}`.trim();
  logger.info(
    {
      username,
      variant,
      timeClass,
      column,
      results,
      accuracy,
      sqlFunction,
    },
    `buildFunctionQuery name=${name} query=${query}`
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
    name: 'averageAccuracyQuery',
    sqlFunction: 'avg',
    accuracy: true,
  });
  const averageAccuracyQueryByWinResults: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByWinResults',
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_WIN_RESULTS,
  });
  const averageAccuracyQueryByDrawResults: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByDrawResults',
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_DRAW_RESULTS,
  });
  const averageAccuracyQueryByLossResults: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByLossResults',
    sqlFunction: 'avg',
    accuracy: true,
    results: CHESS_LOSS_RESULTS,
  });
  const averageAccuracyQueryByYears: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByYears',
    sqlFunction: 'avg',
    accuracy: true,
    column: 'year',
  });
  const averageAccuracyQueryByTimeOfDay: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByTimeOfDay',
    sqlFunction: 'avg',
    accuracy: true,
    column: 'timeOfDay',
  });
  const averageAccuracyQueryByDayOfWeek: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'averageAccuracyQueryByDayOfWeek',
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
  const gamesQueryByYear: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'gamesQueryByYear',
    column: 'year',
  });
  const gamesQueryByTimeOfDay: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'gamesQueryByTimeOfDay',
    column: 'timeOfDay',
  });
  const gamesQueryByDayOfWeek: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'gamesQueryByDayOfWeek',
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
    name: 'winResultsQuery',
    column: 'result',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'drawResultsQuery',
    column: 'result',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsQuery: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'lossResultsQuery',
    column: 'result',
    results: CHESS_LOSS_RESULTS,
  });
  const winResultsQueryByTimeOfDay: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'winResultsQueryByTimeOfDay',
    column: 'timeOfDay',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsQueryByTimeOfDay: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'drawResultsQueryByTimeOfDay',
    column: 'timeOfDay',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsQueryByTimeOfDay: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'lossResultsQueryByTimeOfDay',
    column: 'timeOfDay',
    results: CHESS_LOSS_RESULTS,
  });
  const winResultsQueryByDayOfWeek: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'winResultsQueryByDayOfWeek',
    column: 'dayOfWeek',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsQueryByDayOfWeek: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'drawResultsQueryByDayOfWeek',
    column: 'dayOfWeek',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsQueryByDayOfWeek: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'lossResultsQueryByDayOfWeek',
    column: 'dayOfWeek',
    results: CHESS_LOSS_RESULTS,
  });
  const winResultsQueryByOpponentRating: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'winResultsQueryByOpponentRating',
    column: 'opponent',
    results: CHESS_WIN_RESULTS,
  });
  const drawResultsQueryByOpponentRating: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'drawResultsQueryByOpponentRating',
    column: 'opponent',
    results: CHESS_DRAW_RESULTS,
  });
  const lossResultsQueryByOpponentRating: Prisma.Sql = buildFunctionQuery({
    ...baseOptions,
    name: 'lossResultsQueryByOpponentRating',
    column: 'opponent',
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
    winResultsByOpponentRating = [],
    drawResultsByOpponentRating = [],
    lossResultsByOpponentRating = [],
  ] = await prismaClient.$transaction([
    // Accuracy
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQuery),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQueryByWinResults),
    prismaClient.$queryRaw<AverageByColumn[]>(
      averageAccuracyQueryByDrawResults
    ),
    prismaClient.$queryRaw<AverageByColumn[]>(
      averageAccuracyQueryByLossResults
    ),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQueryByYears),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQueryByTimeOfDay),
    prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQueryByDayOfWeek),
    // Opponents
    prismaClient.$queryRaw<Opponent[]>(opponentsQuery),
    // Games
    prismaClient.chessGame.count({ where: totalGamesWhere }),
    prismaClient.chessGame.count({ where: winGamesWhere }),
    prismaClient.chessGame.count({ where: drawGamesWhere }),
    prismaClient.chessGame.count({ where: lossGamesWhere }),
    prismaClient.$queryRaw<CountByColumn[]>(gamesQueryByYear),
    prismaClient.$queryRaw<CountByColumn[]>(gamesQueryByTimeOfDay),
    prismaClient.$queryRaw<CountByColumn[]>(gamesQueryByDayOfWeek),
    // Results
    prismaClient.$queryRaw<CountByColumn[]>(winResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsQuery),
    prismaClient.$queryRaw<CountByColumn[]>(winResultsQueryByTimeOfDay),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsQueryByTimeOfDay),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsQueryByTimeOfDay),
    prismaClient.$queryRaw<CountByColumn[]>(winResultsQueryByDayOfWeek),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsQueryByDayOfWeek),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsQueryByDayOfWeek),
    prismaClient.$queryRaw<CountByColumn[]>(winResultsQueryByOpponentRating),
    prismaClient.$queryRaw<CountByColumn[]>(drawResultsQueryByOpponentRating),
    prismaClient.$queryRaw<CountByColumn[]>(lossResultsQueryByOpponentRating),
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

  const ratings: Set<number> = new Set(
    [
      ...winResultsByOpponentRating,
      ...drawResultsByOpponentRating,
      ...lossResultsByOpponentRating,
    ].map(({ column }) => column)
  );

  const resultsByOpponentRating: ResultsByOpponentRating[] = [...ratings]
    .map((rating: number) => {
      const { count: win = 0 } = winResultsByOpponentRating.find(
        ({ column: winRating }) => winRating.toString() === rating.toString()
      ) ?? { count: 0 };
      const { count: draw = 0 } = drawResultsByOpponentRating.find(
        ({ column: drawRating }) => drawRating.toString() === rating.toString()
      ) ?? { count: 0 };
      const { count: loss = 0 } = lossResultsByOpponentRating.find(
        ({ column: lossRating }) => lossRating.toString() === rating.toString()
      ) ?? { count: 0 };
      return { rating: rating * 100, win, draw, loss };
    })
    .sort((a, b) => (a.rating > b.rating ? 1 : -1));

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
    opponents: resultsByOpponentRating,
  };
  // Disconect
  await prismaClient.$disconnect();
  return { username, accuracy, games, opponents, results };
};
