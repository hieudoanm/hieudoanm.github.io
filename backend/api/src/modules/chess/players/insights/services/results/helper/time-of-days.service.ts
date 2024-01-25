import { Injectable, Logger } from '@nestjs/common';
import { ChessResult, Prisma } from '@hieudoanm/generated/prisma/chess/client';
import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
} from '../../../../../../../common/constants/chess.constants';
import { TIME_OF_DAYS } from '../../../../../../../common/constants/time.constants';
import { PrismaChessClient } from '../../../../../../../common/prisma/chess/prisma.chess';
import { ResultsByTimeOfDayDto } from '../results.dto';

@Injectable()
export class TimeOfDaysService {
  private readonly logger = new Logger(TimeOfDaysService.name);

  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  private buildWinResultsByTimeOfDaysQuery(username: string) {
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "win"';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
    const query = `${selectClause} FROM chess."ChessGame" as g ${whereClause} GROUP BY "timeOfDayIndex";`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildDrawResultsByTimeOfDaysQuery(username: string): Prisma.Sql {
    const drawList: string = CHESS_DRAW_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "draw"';
    const fromClause = 'FROM chess."ChessGame" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "timeOfDayIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildLossResultsByTimeOfDaysQuery(username: string): Prisma.Sql {
    const lossList: string = CHESS_LOSS_RESULTS.map(
      (result: ChessResult) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "loss"';
    const fromClause = 'FROM chess."ChessGame" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "timeOfDayIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  async getResultsByTimeOfDays(
    username: string
  ): Promise<ResultsByTimeOfDayDto[]> {
    const winQuery = this.buildWinResultsByTimeOfDaysQuery(username);
    const drawQuery = this.buildDrawResultsByTimeOfDaysQuery(username);
    const lossQuery = this.buildLossResultsByTimeOfDaysQuery(username);
    const [wins = [], draws = [], losses = []] =
      await this.prismaChessClient.$transaction([
        this.prismaChessClient.$queryRaw<
          { win: number; timeOfDayIndex: number }[]
        >(winQuery),
        this.prismaChessClient.$queryRaw<
          { draw: number; timeOfDayIndex: number }[]
        >(drawQuery),
        this.prismaChessClient.$queryRaw<
          { loss: number; timeOfDayIndex: number }[]
        >(lossQuery),
      ]);

    return wins.map(({ win, timeOfDayIndex: winTimeOfDayIndex }) => {
      const timeOfDay: string =
        Array.from(TIME_OF_DAYS)[`${winTimeOfDayIndex}`];
      const { draw = 0 } = draws.find(
        ({ timeOfDayIndex: drawTimeOfDayIndex }) =>
          drawTimeOfDayIndex === winTimeOfDayIndex
      ) ?? { draw: 0 };
      const { loss = 0 } = losses.find(
        ({ timeOfDayIndex: lossTimeOfDayIndex }) =>
          lossTimeOfDayIndex === winTimeOfDayIndex
      ) ?? { draw: 0 };
      return { timeOfDay, win, draw, loss };
    });
  }
}
