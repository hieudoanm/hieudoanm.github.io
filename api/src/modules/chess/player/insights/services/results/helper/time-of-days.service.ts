import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  DRAW_RESULTS,
  LOSS_RESULTS,
  TIME_OF_DAYS,
} from '../../../../../../../common/constants/constants';
import { ResultsByTimeOfDayDto } from '../results.dto';
import { PrismaService } from '../../../../../../../common/prisma/prisma.service';

@Injectable()
export class TimeOfDaysService {
  private readonly logger = new Logger(TimeOfDaysService.name);

  constructor(private readonly prismaService: PrismaService) {}

  private buildWinResultsByTimeOfDaysQuery(username: string) {
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "win"';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) = 'win' AND g."rules" = 'chess' AND g."rated" = true`;
    const query = `${selectClause} FROM public."Game" as g ${whereClause} GROUP BY "timeOfDayIndex";`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildDrawResultsByTimeOfDaysQuery(username: string): Prisma.Sql {
    const drawList: string = DRAW_RESULTS.map(
      (result: string) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "draw"';
    const fromClause = 'FROM public."Game" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${drawList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "timeOfDayIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildLossResultsByTimeOfDaysQuery(username: string): Prisma.Sql {
    const lossList: string = LOSS_RESULTS.map(
      (result: string) => `'${result}'`
    ).join(',');
    const selectClause =
      'SELECT floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex", COUNT(*) as "loss"';
    const fromClause = 'FROM public."Game" as g';
    const whereClause = `WHERE TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${lossList}) AND g."rules" = 'chess' AND g."rated" = true`;
    const groupByClause = 'GROUP BY "timeOfDayIndex"';
    const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause};`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  public async getResultsByTimeOfDays(
    username: string
  ): Promise<ResultsByTimeOfDayDto[]> {
    const winQuery = this.buildWinResultsByTimeOfDaysQuery(username);
    const drawQuery = this.buildDrawResultsByTimeOfDaysQuery(username);
    const lossQuery = this.buildLossResultsByTimeOfDaysQuery(username);
    const [wins = [], draws = [], losses = []] =
      await this.prismaService.$transaction([
        this.prismaService.$queryRaw<{ win: number; timeOfDayIndex: number }[]>(
          winQuery
        ),
        this.prismaService.$queryRaw<
          { draw: number; timeOfDayIndex: number }[]
        >(drawQuery),
        this.prismaService.$queryRaw<
          { loss: number; timeOfDayIndex: number }[]
        >(lossQuery),
      ]);

    return wins.map(({ win, timeOfDayIndex: winTimeOfDayIndex }) => {
      const timeOfDay: string = TIME_OF_DAYS[`${winTimeOfDayIndex}`];
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
