import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
  CHESS_WIN_RESULTS,
} from '@chess/common/constants/chess.constants';
import { logger } from '@chess/common/libs/logger';
import { getPrismaClient } from '@chess/common/prisma/prisma.client';
import { ChessResult, Prisma } from '@prisma/client';
import { OpponentDto } from './model';

const buildOpponentsQuery = (username: string): Prisma.Sql => {
  const winList: string = CHESS_WIN_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const drawList: string = CHESS_DRAW_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const lossList: string = CHESS_LOSS_RESULTS.map(
    (result: ChessResult) => `'${result}'`
  ).join(',');
  const selectOpponentClause = `(CASE WHEN g."whiteUsername" = '${username}' THEN g."blackUsername" ELSE g."whiteUsername" END) as "opponent"`;
  const selectCountGamesClause = 'COUNT(*) as "games"';
  const selectCountWinClause = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${winList})) as "win"`;
  const selectCountDrawClause = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList})) as "draw"`;
  const selectCountLossClause = `COUNT(1) FILTER (WHERE (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList})) as "loss"`;
  const selectClause = `SELECT ${selectOpponentClause}, ${selectCountGamesClause}, ${selectCountWinClause}, ${selectCountDrawClause}, ${selectCountLossClause}`;
  const fromClause = 'FROM chess."ChessGame" as g';
  const whereClause = `WHERE (g."whiteUsername" = '${username}' OR g."blackUsername" = '${username}') AND g."rules" = 'chess' AND g."rated" = true`;
  const groupByClause = 'GROUP BY "opponent"';
  const orderByClause = 'ORDER BY "games" DESC';
  const limitClause = 'LIMIT 100';
  const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause} ${limitClause};`;
  logger.info(`buildOpponentsQuery query=${query}`);
  const sql: Prisma.Sql = Prisma.raw(query);
  return sql;
};

export const getOpponents = async (
  username: string
): Promise<OpponentDto[]> => {
  const opponentsQuery = buildOpponentsQuery(username);
  return getPrismaClient().$queryRaw<OpponentDto[]>(opponentsQuery);
};
