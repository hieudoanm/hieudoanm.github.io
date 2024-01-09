import { Injectable, Logger } from '@nestjs/common';
import { ChessResult, Prisma } from '@prisma/client';
import {
  CHESS_DRAW_RESULTS,
  CHESS_LOSS_RESULTS,
  CHESS_WIN_RESULTS,
} from '../../../../../../common/constants/chess.constants';
import {
  DAYS_OF_WEEK,
  RULE,
  TIME_OF_DAYS,
} from '../../../../../../common/constants/time.constants';
import { PrismaService } from '../../../../../../common/prisma/prisma.service';
import {
  AccuracyByDayOfWeekDto,
  AccuracyByPeriodDto,
  AccuracyByTimeOfDayDto,
  AccuracyDto,
} from './accuracy.dto';

@Injectable()
export class AccuracyService {
  private readonly logger = new Logger(AccuracyService.name);

  constructor(private readonly prismaService: PrismaService) {}

  private buildAccuracyByResultsQuery(
    {
      averageClause,
      whereClause,
      username,
    }: { averageClause: string; whereClause: string; username: string },
    results: ChessResult[] = []
  ): Prisma.Sql {
    const list: string = results.map((result) => `'${result}'`).join(',');
    const clause = `TEXT(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteResult" ELSE g."blackResult" END) in (${list})`;
    const averageQuery = `SELECT ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} AND ${clause}`;
    const sql: Prisma.Sql = Prisma.raw(averageQuery);
    return sql;
  }

  private async getAccuracyByResults({
    averageClause,
    whereClause,
    username,
  }: {
    averageClause: string;
    whereClause: string;
    username: string;
  }): Promise<{ win: number; draw: number; loss: number }> {
    const winQuery = this.buildAccuracyByResultsQuery(
      { averageClause, whereClause, username },
      CHESS_WIN_RESULTS
    );
    const drawQuery = this.buildAccuracyByResultsQuery(
      { averageClause, whereClause, username },
      CHESS_DRAW_RESULTS
    );
    const lossQuery = this.buildAccuracyByResultsQuery(
      { averageClause, whereClause, username },
      CHESS_LOSS_RESULTS
    );
    const [
      [{ average: win = 0 }],
      [{ average: draw = 0 }],
      [{ average: loss = 0 }],
    ] = await this.prismaService.$transaction([
      this.prismaService.$queryRaw<{ average: number }[]>(winQuery),
      this.prismaService.$queryRaw<{ average: number }[]>(drawQuery),
      this.prismaService.$queryRaw<{ average: number }[]>(lossQuery),
    ]);

    return { win, draw, loss };
  }

  private buildAverageAccuracyQuery({
    averageClause,
    whereClause,
  }: {
    averageClause: string;
    whereClause: string;
  }) {
    const averageQuery = `SELECT ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause}`;
    const sql: Prisma.Sql = Prisma.raw(averageQuery);
    return sql;
  }

  private buildAverageAccuracyByPeriods({
    averageClause,
    whereClause,
  }: {
    averageClause: string;
    whereClause: string;
  }): Prisma.Sql {
    const groupByClause = `GROUP BY extract(year from g."endTime")`;
    const extractClause = 'extract(year from g."endTime")::int as "period"';
    const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildAverageAccuracyByTimeOfDays({
    averageClause,
    whereClause,
  }: {
    averageClause: string;
    whereClause: string;
  }): Prisma.Sql {
    const groupByClause = `GROUP BY "timeOfDayIndex"`;
    const extractClause =
      'floor(extract(hour from g."endTime") / 6.0)::int as "timeOfDayIndex"';
    const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private buildAverageAccuracyByDaysOfWeek({
    averageClause,
    whereClause,
  }: {
    averageClause: string;
    whereClause: string;
  }): Prisma.Sql {
    const groupByClause = `GROUP BY "dayOfWeekIndex"`;
    const extractClause = 'extract(dow from g."endTime") as "dayOfWeekIndex"';
    const query = `SELECT ${extractClause}, ${averageClause} FROM chess."ChessGame" as g WHERE ${whereClause} ${groupByClause}`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  private async getAverageAccuracy({
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
  }> {
    const averageAccuracyQuery = this.buildAverageAccuracyQuery({
      averageClause,
      whereClause,
    });
    const averageAccuracyByPeriodsQuery = this.buildAverageAccuracyByPeriods({
      averageClause,
      whereClause,
    });
    const averageAccuracyByTimeOfDaysQuery =
      this.buildAverageAccuracyByTimeOfDays({
        averageClause,
        whereClause,
      });
    const averageAccuracyByDaysOfWeekQuery =
      this.buildAverageAccuracyByDaysOfWeek({
        averageClause,
        whereClause,
      });
    const [
      [{ average = 0 }],
      periods = [],
      timeOfDaysList = [],
      daysOfWeekList = [],
    ] = await this.prismaService.$transaction([
      this.prismaService.$queryRaw<{ average: number }[]>(averageAccuracyQuery),
      this.prismaService.$queryRaw<AccuracyByPeriodDto[]>(
        averageAccuracyByPeriodsQuery
      ),
      this.prismaService.$queryRaw<
        { average: number; timeOfDayIndex: number }[]
      >(averageAccuracyByTimeOfDaysQuery),
      this.prismaService.$queryRaw<
        { average: number; dayOfWeekIndex: number }[]
      >(averageAccuracyByDaysOfWeekQuery),
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
  }

  public async getAccuracy(username: string): Promise<AccuracyDto> {
    const averageClause = `AVG(CASE WHEN g."whiteUsername" = '${username}' THEN g."whiteAccuracy" ELSE g."blackAccuracy" END) as "average"`;
    const whereClause = `g."whiteAccuracy" != 0 AND g."blackAccuracy" != 0 AND g."rules" = '${RULE}' AND g."rated" = true`;
    // Average
    const {
      average = 0,
      periods = [],
      timeOfDays = [],
      daysOfWeek = [],
    } = await this.getAverageAccuracy({ averageClause, whereClause });
    const {
      win = 0,
      draw = 0,
      loss = 0,
    } = await this.getAccuracyByResults({
      averageClause,
      whereClause,
      username,
    });
    return { average, win, draw, loss, periods, timeOfDays, daysOfWeek };
  }
}
