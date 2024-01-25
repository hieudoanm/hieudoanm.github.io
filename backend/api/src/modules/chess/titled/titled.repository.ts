import { ChessTitle } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.dto';
import {
  TIME_RANGE_IN_DAYS,
  TIME_RANGE_IN_MILLISECONDS,
} from '@hieudoanm/common/constants/time.constants';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { TimeRange } from '@hieudoanm/common/types/time.types';
import { Injectable, Logger } from '@nestjs/common';
import {
  ChessPlayer,
  ChessTimeClass,
  Prisma,
} from '@hieudoanm/generated/prisma/chess/client';
import { TitledStatsDto } from './titled.dto';

@Injectable()
export class TitledRepository {
  private readonly logger = new Logger(TitledRepository.name);

  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  private async getTitledPlayers({
    title,
    timeRange = 'year',
  }: {
    title: ChessTitle;
    timeRange: TimeRange;
  }): Promise<{ total: number; players: ChessPlayer[] }> {
    const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get(timeRange);
    const d = new Date(Date.now() - milliseconds);
    const [date] = d.toISOString().split('T');
    const where = { title, lastOnline: { gte: `${date}T00:00:00Z` } };
    const [total = 0, players = []] = await this.prismaChessClient.$transaction(
      [
        this.prismaChessClient.chessPlayer.count({ where }),
        this.prismaChessClient.chessPlayer.findMany({
          where,
          include: { stats: true },
          orderBy: [{ username: 'asc' }],
        }),
      ]
    );
    return {
      total,
      players,
    };
  }

  private buildAverageRatingQuery({
    title,
    timeRange,
    timeClass,
  }: {
    title: string;
    timeRange: TimeRange;
    timeClass: ChessTimeClass;
  }): Prisma.Sql {
    const days: number = TIME_RANGE_IN_DAYS.get(timeRange);
    const query: string = `SELECT AVG(stats."last") AS "average"
FROM chess."ChessStats" AS stats
WHERE stats."last" != 0
AND stats."timeClass" = '${timeClass}'
AND stats."playerId" IN (SELECT player."id"
FROM chess."ChessPlayer" AS player
WHERE player."title" = '${title}'
AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day));`;
    this.logger.log(`buildAverageRatingQuery query=${query}`);
    return Prisma.raw(query);
  }

  private buildMaxAverageRating({
    title,
    timeRange,
    timeClass,
  }: {
    title: string;
    timeRange: TimeRange;
    timeClass: string;
  }): Prisma.Sql {
    const days: number = TIME_RANGE_IN_DAYS.get(timeRange);
    const query: string = `SELECT MAX(stats."last") AS "max"
FROM chess."ChessStats" AS stats
WHERE stats."last" != 0
AND stats."timeClass" = '${timeClass}'
AND stats."playerId" IN (SELECT player."id"
FROM chess."ChessPlayer" AS player
WHERE player."title" = '${title}'
AND player."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day));`;
    this.logger.log(`buildMaxAverageRating query=${query}`);
    return Prisma.raw(query);
  }

  async getTitledStats({
    title,
    timeRange,
  }: {
    title: ChessTitle;
    timeRange: TimeRange;
  }): Promise<TitledStatsDto> {
    const averageRapidRatingQuery = this.buildAverageRatingQuery({
      title,
      timeRange,
      timeClass: 'rapid',
    });
    const maxRapidRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeClass: 'rapid',
    });
    const averageBlitzRatingQuery = this.buildAverageRatingQuery({
      title,
      timeRange,
      timeClass: 'blitz',
    });
    const maxBlitzRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeClass: 'blitz',
    });
    const averageBulletRatingQuery = this.buildAverageRatingQuery({
      title,
      timeRange,
      timeClass: 'bullet',
    });
    const maxBulletRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeClass: 'bullet',
    });
    const [
      [{ average: averageRapidRating = 0 }],
      [{ max: maxRapidRating = 0 }],
      [{ average: averageBlitzRating = 0 }],
      [{ max: maxBlitzRating = 0 }],
      [{ average: averageBulletRating = 0 }],
      [{ max: maxBulletRating = 0 }],
    ] = await this.prismaChessClient.$transaction([
      this.prismaChessClient.$queryRaw<{ average: number }[]>(
        averageRapidRatingQuery
      ),
      this.prismaChessClient.$queryRaw<{ max: number }[]>(maxRapidRatingQuery),
      this.prismaChessClient.$queryRaw<{ average: number }[]>(
        averageBlitzRatingQuery
      ),
      this.prismaChessClient.$queryRaw<{ max: number }[]>(maxBlitzRatingQuery),
      this.prismaChessClient.$queryRaw<{ average: number }[]>(
        averageBulletRatingQuery
      ),
      this.prismaChessClient.$queryRaw<{ max: number }[]>(maxBulletRatingQuery),
    ]);
    const { total = 0, players = [] } = await this.getTitledPlayers({
      title,
      timeRange,
    });
    return {
      averageRapidRating: Number.parseFloat(averageRapidRating.toFixed(2)),
      maxRapidRating,
      averageBlitzRating: Number.parseFloat(averageBlitzRating.toFixed(2)),
      maxBlitzRating,
      averageBulletRating: Number.parseFloat(averageBulletRating.toFixed(2)),
      maxBulletRating,
      total,
      players,
    };
  }
}
