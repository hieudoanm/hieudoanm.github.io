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
import { ChessSide } from '@chess/common/types/chess';
import {
  ChessPhrase,
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
  Geography,
  Insights,
  OpeningCount,
  Opponent,
  Pieces,
  ResultsByDayOfWeek,
  ResultsByEndPhrase,
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
  endPhrase = false,
}: {
  username?: string;
  variant?: ChessVariant;
  accuracy?: boolean;
  timeClass?: ChessTimeClass;
  results?: ChessResult[];
  rated?: boolean;
  endPhrase?: boolean;
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

  const whereEndPhraseClause: string = endPhrase
    ? `g."endPhrase" IS NOT NULL`
    : '';

  const whereRatedClause: string = rated ? `g."rated" = true` : '';

  const whereClauses: string[] = [
    whereEndPhraseClause,
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
  endPhrase = false,
}: {
  name?: string;
  sqlFunction?: 'count' | 'avg';
  column?:
    | 'year'
    | 'timeOfDay'
    | 'dayOfWeek'
    | 'result'
    | 'opponent'
    | 'endPhrase'
    | '';
  accuracy?: boolean;
  username?: string;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
  results?: ChessResult[];
  rated?: boolean;
  endPhrase?: boolean;
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
    endPhrase: 'g."endPhrase"',
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
    endPhrase,
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
      endPhrase,
      sqlFunction,
    },
    `buildFunctionQuery name=${name} query=${query}`
  );
  return Prisma.raw(query);
};

const buildOpeningsQuery = ({
  username,
  side,
  limit = 10,
  variant = 'chess',
  timeClass = 'blitz',
}: {
  username: string;
  side: ChessSide;
  limit?: number;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
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
  const query: string = `SELECT g."opening",
o."pgn",
COUNT(*) as total,
SUM(CASE WHEN g."${side}Result" IN (${winResults}) THEN 1 ELSE 0 END) as win,
SUM(CASE WHEN g."${side}Result" IN (${drawResults}) THEN 1 ELSE 0 END) as draw,
SUM(CASE WHEN g."${side}Result" IN (${lossResults}) THEN 1 ELSE 0 END) as loss
FROM chess."ChessGame" as g
JOIN chess."ChessOpening" as o
ON g."opening" = o."name"
WHERE g."opening" <> ''
AND g."rated" = true
AND g."rules" = '${variant}'
AND g."timeClass" = '${timeClass}'
AND g."${side}Username" = '${username}'
GROUP BY g."opening", o."pgn"
ORDER BY total DESC
LIMIT 10;`;
  logger.info({ username, side, limit }, `buildOpeningsQuery query=${query}`);
  return Prisma.raw(query);
};

const buildMovesByPiecesQuery = ({
  username,
  variant = 'chess',
  timeClass = 'blitz',
}: {
  username: string;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
}): Prisma.Sql => {
  const query: string = `SELECT
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whitePawn" ELSE g."blackPawn" END) as pawn,
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteKnight" ELSE g."blackKnight" END) as knight,
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteBishop" ELSE g."blackBishop" END) as bishop,
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteRook" ELSE g."blackRook" END) as rook,
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteQueen" ELSE g."blackQueen" END) as queen,
SUM(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteKing" ELSE g."blackKing" END) as king
FROM chess."ChessGame" as g
WHERE (g."whiteUsername" = '${username}' OR g."blackUsername" = '${username}')
AND g."rated" = true
AND g."rules" = '${variant}'
AND g."timeClass" = '${timeClass}';`;
  logger.info({ username }, `buildMovesByPiecesQuery query=${query}`);
  return Prisma.raw(query);
};

const buildSumMovesByCastlingQuery =
  (
    username: string,
    first: string,
    second: string
  ): ((results: ChessResult[], column: string) => string) =>
  (results: ChessResult[], column: string): string => {
    const resultsString: string = results
      .map((result: ChessResult) => `'${result}'`)
      .join(',');
    return `SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = '${username}' THEN c."whiteCastling" ELSE c."blackCastling" END) = '${first}' AND
  (CASE WHEN c."whiteUsername" = '${username}' THEN c."blackCastling" ELSE c."whiteCastling" END) = '${second}' AND
  (CASE WHEN c."whiteUsername" = '${username}' THEN c."whiteResult" ELSE c."blackResult" END) IN (${resultsString}) THEN 1 ELSE 0 END
) as ${column}`;
  };

const buildMovesByCastlingQuery = ({
  username,
  variant = 'chess',
  timeClass = 'blitz',
}: {
  username: string;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
}): Prisma.Sql => {
  const ssQuery = buildSumMovesByCastlingQuery(username, 'short', 'short');
  const ssw: string = ssQuery(CHESS_WIN_RESULTS, 'short_short_win');
  const ssd: string = ssQuery(CHESS_DRAW_RESULTS, 'short_short_draw');
  const ssl: string = ssQuery(CHESS_LOSS_RESULTS, 'short_short_loss');
  const slQuery = buildSumMovesByCastlingQuery(username, 'short', 'long');
  const slw: string = slQuery(CHESS_WIN_RESULTS, 'short_long_win');
  const sld: string = slQuery(CHESS_DRAW_RESULTS, 'short_long_draw');
  const sll: string = slQuery(CHESS_LOSS_RESULTS, 'short_long_loss');
  const snQuery = buildSumMovesByCastlingQuery(username, 'short', '');
  const snw: string = snQuery(CHESS_WIN_RESULTS, 'short_none_win');
  const snd: string = snQuery(CHESS_DRAW_RESULTS, 'short_none_draw');
  const snl: string = snQuery(CHESS_LOSS_RESULTS, 'short_none_loss');
  const lsQuery = buildSumMovesByCastlingQuery(username, 'long', 'short');
  const lsw: string = lsQuery(CHESS_WIN_RESULTS, 'long_short_win');
  const lsd: string = lsQuery(CHESS_DRAW_RESULTS, 'long_short_draw');
  const lsl: string = lsQuery(CHESS_LOSS_RESULTS, 'long_short_loss');
  const llQuery = buildSumMovesByCastlingQuery(username, 'long', 'long');
  const llw: string = llQuery(CHESS_WIN_RESULTS, 'long_long_win');
  const lld: string = llQuery(CHESS_DRAW_RESULTS, 'long_long_draw');
  const lll: string = llQuery(CHESS_LOSS_RESULTS, 'long_long_loss');
  const lnQuery = buildSumMovesByCastlingQuery(username, 'long', '');
  const lnw: string = lnQuery(CHESS_WIN_RESULTS, 'long_none_win');
  const lnd: string = lnQuery(CHESS_DRAW_RESULTS, 'long_none_draw');
  const lnl: string = lnQuery(CHESS_LOSS_RESULTS, 'long_none_loss');
  const nsQuery = buildSumMovesByCastlingQuery(username, '', 'short');
  const nsw: string = nsQuery(CHESS_WIN_RESULTS, 'none_short_win');
  const nsd: string = nsQuery(CHESS_DRAW_RESULTS, 'none_short_draw');
  const nsl: string = nsQuery(CHESS_LOSS_RESULTS, 'none_short_loss');
  const nlQuery = buildSumMovesByCastlingQuery(username, '', 'long');
  const nlw: string = nlQuery(CHESS_WIN_RESULTS, 'none_long_win');
  const nld: string = nlQuery(CHESS_DRAW_RESULTS, 'none_long_draw');
  const nll: string = nlQuery(CHESS_LOSS_RESULTS, 'none_long_loss');
  const nnQuery = buildSumMovesByCastlingQuery(username, '', '');
  const nnw: string = nnQuery(CHESS_WIN_RESULTS, 'none_none_win');
  const nnd: string = nnQuery(CHESS_DRAW_RESULTS, 'none_none_draw');
  const nnl: string = nnQuery(CHESS_LOSS_RESULTS, 'none_none_loss');
  const query: string = `SELECT
${ssw}, ${ssd}, ${ssl}, ${slw}, ${sld}, ${sll}, ${snw}, ${snd}, ${snl},
${lsw}, ${lsd}, ${lsl}, ${llw}, ${lld}, ${lll}, ${lnw}, ${lnd}, ${lnl},
${nsw}, ${nsd}, ${nsl}, ${nlw}, ${nld}, ${nll}, ${nnw}, ${nnd}, ${nnl}
FROM chess."ChessGame" as c
WHERE (c."whiteUsername" = '${username}' OR c."blackUsername" = '${username}')
AND c."rated" = true
AND c."rules" = '${variant}'
AND c."timeClass" = '${timeClass}';`;
  logger.info({ username }, `buildMovesByCastlingQuery query=${query}`);
  return Prisma.raw(query);
};

const buildGeographyQuery = ({
  username,
  variant = 'chess',
  timeClass = 'blitz',
}: {
  username: string;
  variant?: ChessVariant;
  timeClass?: ChessTimeClass;
}) => {
  const winResults: string = CHESS_WIN_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const drawResults: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const lossResults: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const query: string = `SELECT
c."flag",
p."countryCode" as code,
c."name",
COUNT(p."countryCode") as total,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) IN (${winResults}) THEN 1 ELSE 0 END) as win,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) IN (${drawResults}) THEN 1 ELSE 0 END) as draw,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) IN (${lossResults}) THEN 1 ELSE 0 END) as loss
FROM chess."ChessGame" as g
JOIN chess."ChessPlayer" as p
ON (CASE g."whiteUsername" WHEN '${username}' THEN g."blackUsername" ELSE g."whiteUsername" END) = p."username"
JOIN chess."ChessCountry" as c
ON c."cca2" = p."countryCode"
WHERE (g."whiteUsername" = '${username}' OR g."blackUsername" = '${username}')
AND g."rated" = true
AND g."rules" = '${variant}'
AND g."timeClass" = '${timeClass}'
GROUP BY c."flag", p."countryCode", c."name"
ORDER BY total DESC;`;
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
  try {
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
    // Openings
    const whiteOpeningsQuery: Prisma.Sql = buildOpeningsQuery({
      variant,
      username,
      timeClass,
      limit: 10,
      side: 'white',
    });
    const blackOpeningsQuery: Prisma.Sql = buildOpeningsQuery({
      variant,
      username,
      timeClass,
      limit: 10,
      side: 'black',
    });
    // Moves
    const movesByPiecesQuery: Prisma.Sql = buildMovesByPiecesQuery({
      variant,
      username,
      timeClass,
    });
    const movesByCastlingQuery: Prisma.Sql = buildMovesByCastlingQuery({
      variant,
      username,
      timeClass,
    });
    // Geography
    const geographyQuery: Prisma.Sql = buildGeographyQuery({
      variant,
      username,
      timeClass,
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
    const winResultsQueryByEndPhrase: Prisma.Sql = buildFunctionQuery({
      ...baseOptions,
      endPhrase: true,
      name: 'winResultsQueryByEndPhrase',
      column: 'endPhrase',
      results: CHESS_WIN_RESULTS,
    });
    const drawResultsQueryByEndPhrase: Prisma.Sql = buildFunctionQuery({
      ...baseOptions,
      endPhrase: true,
      name: 'drawResultsQueryByEndPhrase',
      column: 'endPhrase',
      results: CHESS_DRAW_RESULTS,
    });
    const lossResultsQueryByEndPhrase: Prisma.Sql = buildFunctionQuery({
      ...baseOptions,
      endPhrase: true,
      name: 'lossResultsQueryByEndPhrase',
      column: 'endPhrase',
      results: CHESS_LOSS_RESULTS,
    });
    const [
      // Accuracy
      [{ average = 0 }] = [{ average: 0 }],
      [{ average: win = 0 }] = [{ average: 0 }],
      [{ average: draw = 0 }] = [{ average: 0 }],
      [{ average: loss = 0 }] = [{ average: 0 }],
      averageAccuracyByYearsList = [],
      averageAccuracyByTimeOfDaysList = [],
      averageAccuracyByDaysOfWeekList = [],
      // Openings
      whiteOpenings = [],
      blackOpenings = [],
      // Moves
      [{ king = 0, queen = 0, rook = 0, bishop = 0, knight = 0, pawn = 0 }] = [
        { king: 0, queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 },
      ],
      [
        {
          short_short_win = 0,
          short_short_draw = 0,
          short_short_loss = 0,
          short_long_win = 0,
          short_long_draw = 0,
          short_long_loss = 0,
          short_none_win = 0,
          short_none_draw = 0,
          short_none_loss = 0,
          long_short_win = 0,
          long_short_draw = 0,
          long_short_loss = 0,
          long_long_win = 0,
          long_long_draw = 0,
          long_long_loss = 0,
          long_none_win = 0,
          long_none_draw = 0,
          long_none_loss = 0,
          none_short_win = 0,
          none_short_draw = 0,
          none_short_loss = 0,
          none_long_win = 0,
          none_long_draw = 0,
          none_long_loss = 0,
          none_none_win = 0,
          none_none_draw = 0,
          none_none_loss = 0,
        },
      ] = [
        {
          short_short_win: 0,
          short_short_draw: 0,
          short_short_loss: 0,
          short_long_win: 0,
          short_long_draw: 0,
          short_long_loss: 0,
          short_none_win: 0,
          short_none_draw: 0,
          short_none_loss: 0,
          long_short_win: 0,
          long_short_draw: 0,
          long_short_loss: 0,
          long_long_win: 0,
          long_long_draw: 0,
          long_long_loss: 0,
          long_none_win: 0,
          long_none_draw: 0,
          long_none_loss: 0,
          none_short_win: 0,
          none_short_draw: 0,
          none_short_loss: 0,
          none_long_win: 0,
          none_long_draw: 0,
          none_long_loss: 0,
          none_none_win: 0,
          none_none_draw: 0,
          none_none_loss: 0,
        },
      ],
      // Geography
      geography = [],
      // Opponents
      opponents = [],
      // Games
      totalGames = 0,
      winGames = 0,
      drawGames = 0,
      lossGames = 0,
      gamesByYearsList = [],
      gamesByTimeOfDaysList = [],
      gamesByDaysOfWeekList = [],
      // Results
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
      winResultsByEndPhrase = [],
      drawResultsByEndPhrase = [],
      lossResultsByEndPhrase = [],
    ] = await prismaClient.$transaction([
      // Accuracy
      prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQuery),
      prismaClient.$queryRaw<AverageByColumn[]>(
        averageAccuracyQueryByWinResults
      ),
      prismaClient.$queryRaw<AverageByColumn[]>(
        averageAccuracyQueryByDrawResults
      ),
      prismaClient.$queryRaw<AverageByColumn[]>(
        averageAccuracyQueryByLossResults
      ),
      prismaClient.$queryRaw<AverageByColumn[]>(averageAccuracyQueryByYears),
      prismaClient.$queryRaw<AverageByColumn[]>(
        averageAccuracyQueryByTimeOfDay
      ),
      prismaClient.$queryRaw<AverageByColumn[]>(
        averageAccuracyQueryByDayOfWeek
      ),
      // Openings
      prismaClient.$queryRaw<OpeningCount[]>(whiteOpeningsQuery),
      prismaClient.$queryRaw<OpeningCount[]>(blackOpeningsQuery),
      // Moves
      prismaClient.$queryRaw<Pieces[]>(movesByPiecesQuery),
      prismaClient.$queryRaw<
        {
          short_short_win: number;
          short_short_draw: number;
          short_short_loss: number;
          short_long_win: number;
          short_long_draw: number;
          short_long_loss: number;
          short_none_win: number;
          short_none_draw: number;
          short_none_loss: number;
          long_short_win: number;
          long_short_draw: number;
          long_short_loss: number;
          long_long_win: number;
          long_long_draw: number;
          long_long_loss: number;
          long_none_win: number;
          long_none_draw: number;
          long_none_loss: number;
          none_short_win: number;
          none_short_draw: number;
          none_short_loss: number;
          none_long_win: number;
          none_long_draw: number;
          none_long_loss: number;
          none_none_win: number;
          none_none_draw: number;
          none_none_loss: number;
        }[]
      >(movesByCastlingQuery),
      // Geography
      prismaClient.$queryRaw<Geography[]>(geographyQuery),
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
      prismaClient.$queryRaw<CountByColumn[]>(winResultsQueryByEndPhrase),
      prismaClient.$queryRaw<CountByColumn[]>(drawResultsQueryByEndPhrase),
      prismaClient.$queryRaw<CountByColumn[]>(lossResultsQueryByEndPhrase),
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
    // Games by Years
    const gamesByYears: GamesByYear[] = gamesByYearsList.map(
      ({ count: games = 0, column = 0 }) => ({
        games,
        period: column,
      })
    );
    // Games by Time of Day
    const gamesByTimeOfDays: GamesByTimeOfDay[] = gamesByTimeOfDaysList.map(
      ({ count: games = 0, column = 0 }) => ({
        games,
        timeOfDay: [...TIME_OF_DAYS][`${column}`],
      })
    );
    // Games by Day of Week
    const gamesByDaysOfWeek: GamesByDayOfWeek[] = gamesByDaysOfWeekList.map(
      ({ count: games = 0, column = 0 }) => ({
        games,
        dayOfWeek: [...DAYS_OF_WEEK][`${column}`],
      })
    );
    // Games
    const games = {
      total: totalGames,
      win: winGames,
      draw: drawGames,
      loss: lossGames,
      periods: gamesByYears,
      timeOfDays: gamesByTimeOfDays,
      daysOfWeek: gamesByDaysOfWeek,
    };

    // Results by Time of Day
    const resultsByTimeOfDays: ResultsByTimeOfDay[] =
      winResultsByTimeOfDays.map(({ count: win, column }) => {
        const timeOfDay: string = [...TIME_OF_DAYS][
          `${Number.parseInt(column.toString())}`
        ];
        const { count: draw = 0 } = drawResultsByTimeOfDays.find(
          ({ column: drawColumn }) =>
            drawColumn.toString() === column.toString()
        ) ?? { draw: 0 };
        const { count: loss = 0 } = lossResultsByTimeOfDays.find(
          ({ column: lossColumn }) =>
            lossColumn.toString() === column.toString()
        ) ?? { count: 0 };
        return { timeOfDay, win, draw, loss };
      });
    // Results by Day of Week
    const resultsByDaysOfWeek: ResultsByDayOfWeek[] =
      winResultsByDaysOfWeek.map(({ count: win, column }) => {
        const dayOfWeek: string = [...DAYS_OF_WEEK][
          `${Number.parseInt(column.toString())}`
        ];
        const { count: draw = 0 } = drawResultsByDaysOfWeek.find(
          ({ column: drawColumn }) =>
            drawColumn.toString() === column.toString()
        ) ?? { draw: 0 };
        const { count: loss = 0 } = lossResultsByDaysOfWeek.find(
          ({ column: lossColumn }) =>
            lossColumn.toString() === column.toString()
        ) ?? { count: 0 };
        return { dayOfWeek, win, draw, loss };
      });
    // Results by Opponent Rating
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
          ({ column: drawRating }) =>
            drawRating.toString() === rating.toString()
        ) ?? { count: 0 };
        const { count: loss = 0 } = lossResultsByOpponentRating.find(
          ({ column: lossRating }) =>
            lossRating.toString() === rating.toString()
        ) ?? { count: 0 };
        return { rating: rating * 100, win, draw, loss };
      })
      .sort((a, b) => (a.rating > b.rating ? 1 : -1));
    // Results by
    const endPhrases = new Set(
      [
        ...winResultsByEndPhrase,
        ...drawResultsByEndPhrase,
        ...lossResultsByEndPhrase,
      ].map(({ column }) => column)
    );
    const resultsByEndPhrase: ResultsByEndPhrase[] = [...endPhrases].map(
      (endPhrase: number) => {
        const { count: win = 0 } = winResultsByEndPhrase.find(
          ({ column: winPhrase }) =>
            winPhrase.toString() === endPhrase.toString()
        ) ?? { count: 0 };
        const { count: draw = 0 } = drawResultsByEndPhrase.find(
          ({ column: drawPhrase }) =>
            drawPhrase.toString() === endPhrase.toString()
        ) ?? { count: 0 };
        const { count: loss = 0 } = lossResultsByEndPhrase.find(
          ({ column: lossPhrase }) =>
            lossPhrase.toString() === endPhrase.toString()
        ) ?? { count: 0 };
        return { phrase: endPhrase.toString() as ChessPhrase, win, draw, loss };
      }
    );
    // Results
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
      endPhrases: resultsByEndPhrase,
    };
    // Disconect
    await prismaClient.$disconnect();
    return {
      username,
      accuracy,
      results,
      games,
      openings: { white: whiteOpenings, black: blackOpenings },
      moves: {
        pieces: {
          king,
          queen,
          rook,
          bishop,
          knight,
          pawn,
        },
        castling: {
          short: {
            short: {
              win: short_short_win,
              draw: short_short_draw,
              loss: short_short_loss,
            },
            long: {
              win: short_long_win,
              draw: short_long_draw,
              loss: short_long_loss,
            },
            none: {
              win: short_none_win,
              draw: short_none_draw,
              loss: short_none_loss,
            },
          },
          long: {
            short: {
              win: long_short_win,
              draw: long_short_draw,
              loss: long_short_loss,
            },
            long: {
              win: long_long_win,
              draw: long_long_draw,
              loss: long_long_loss,
            },
            none: {
              win: long_none_win,
              draw: long_none_draw,
              loss: long_none_loss,
            },
          },
          none: {
            short: {
              win: none_short_win,
              draw: none_short_draw,
              loss: none_short_loss,
            },
            long: {
              win: none_long_win,
              draw: none_long_draw,
              loss: none_long_loss,
            },
            none: {
              win: none_none_win,
              draw: none_none_draw,
              loss: none_none_loss,
            },
          },
        },
      },
      geography,
      opponents,
    };
  } catch (error) {
    logger.error(`getInsights error=${error}`);
    return { username } as Insights;
  }
};
