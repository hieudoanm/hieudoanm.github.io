import { Injectable } from '@nestjs/common';
import { ChessResult, Prisma } from '@prisma/client';
import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
} from '../../../../../../common/constants/chess.constants';
import { PrismaService } from '../../../../../../common/prisma/prisma.service';
import { DaysOfWeekService } from './helper/days-of-week.service';
import { TimeOfDaysService } from './helper/time-of-days.service';
import { ResultDto, ResultsDto } from './results.dto';

@Injectable()
export class ResultsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly timeOfDaysService: TimeOfDaysService,
    private readonly daysOfWeekService: DaysOfWeekService
  ) {}

  private buildWinResultsQuery(username: string): Prisma.Sql {
    const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END) as "count"`;
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."blackResult" ELSE g."whiteResult" END`;
    const orderByClause = `ORDER BY "count" DESC`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause} ${orderByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildDrawResultsQuery(username: string): Prisma.Sql {
    const drawList: string = CHESS_DRAW_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "count"`;
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END`;
    const orderByClause = `ORDER BY "count" DESC`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause} ${orderByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildLossResultsQuery(username: string): Prisma.Sql {
    const lossList: string = CHESS_LOSS_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause = `SELECT (CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "result", COUNT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) as "count"`;
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = `GROUP BY CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END`;
    const orderByClause = `ORDER BY "count" DESC`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} ${groupByClause} ${orderByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  public async getResults(username: string): Promise<ResultsDto> {
    const winQuery = this.buildWinResultsQuery(username);
    const drawQuery = this.buildDrawResultsQuery(username);
    const lossQuery = this.buildLossResultsQuery(username);
    const [win = [], draw = [], loss = []] =
      await this.prismaService.$transaction([
        this.prismaService.$queryRaw<ResultDto[]>(winQuery),
        this.prismaService.$queryRaw<ResultDto[]>(drawQuery),
        this.prismaService.$queryRaw<ResultDto[]>(lossQuery),
      ]);
    const timeOfDays =
      await this.timeOfDaysService.getResultsByTimeOfDays(username);
    const daysOfWeek =
      await this.daysOfWeekService.getResultsByDaysOfWeek(username);
    return { win, draw, loss, timeOfDays, daysOfWeek };
  }
}
