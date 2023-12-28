import { Injectable, Logger } from '@nestjs/common';
import { ChessResult, Prisma } from '@prisma/client';
import { DAYS_OF_WEEK } from '../../../../../../../common/constants/time.constants';
import { ResultsByDayOfWeekDto } from '../results.dto';
import { PrismaService } from '../../../../../../../common/prisma/prisma.service';
import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
} from '../../../../../../../common/constants/chess.constants';

@Injectable()
export class DaysOfWeekService {
  private readonly logger = new Logger(DaysOfWeekService.name);

  constructor(private readonly prismaService: PrismaService) {}

  private buildWinResultsByDaysOfWeekQuery(username: string): Prisma.Sql {
    const selectClause =
      'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "win"';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
    const query = `${selectClause} FROM public."Game" as g ${whereClause} GROUP BY "dayOfWeekIndex";`;
    this.logger.log(`buildWinResultsByDaysOfWeekQuery query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildDrawResultsByDaysOfWeekQuery(username: string): Prisma.Sql {
    const drawList: string = CHESS_DRAW_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "draw"';
    const fromClause = 'FROM public."Game" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "dayOfWeekIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    this.logger.log(`buildDrawResultsByDaysOfWeekQuery query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildLossResultsByDaysOfWeekQuery(username: string): Prisma.Sql {
    const lossList: string = CHESS_LOSS_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT extract(dow from g."endTime")::int as "dayOfWeekIndex", COUNT(*) as "loss"';
    const fromClause = 'FROM public."Game" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "dayOfWeekIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    this.logger.log(`buildLossResultsByDaysOfWeekQuery query=${query}`);
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  public async getResultsByDaysOfWeek(
    username: string
  ): Promise<ResultsByDayOfWeekDto[]> {
    const winQuery = this.buildWinResultsByDaysOfWeekQuery(username);
    const drawQuery = this.buildDrawResultsByDaysOfWeekQuery(username);
    const lossQuery = this.buildLossResultsByDaysOfWeekQuery(username);
    const [wins = [], draws = [], losses = []] =
      await this.prismaService.$transaction([
        this.prismaService.$queryRaw<{ win: number; dayOfWeekIndex: number }[]>(
          winQuery
        ),
        this.prismaService.$queryRaw<
          { draw: number; dayOfWeekIndex: number }[]
        >(drawQuery),
        this.prismaService.$queryRaw<
          { loss: number; dayOfWeekIndex: number }[]
        >(lossQuery),
      ]);
    return wins.map(({ win, dayOfWeekIndex: winDayOfWeekIndex }) => {
      const dayOfWeek: string =
        Array.from(DAYS_OF_WEEK)[`${winDayOfWeekIndex}`];
      const { draw = 0 } = draws.find(
        ({ dayOfWeekIndex: drawDayOfWeekIndex }) =>
          drawDayOfWeekIndex === winDayOfWeekIndex
      ) ?? { draw: 0 };
      const { loss = 0 } = losses.find(
        ({ dayOfWeekIndex: lossDayOfWeekIndex }) =>
          lossDayOfWeekIndex === winDayOfWeekIndex
      ) ?? { draw: 0 };
      return { dayOfWeek, win, draw, loss };
    });
  }
}
