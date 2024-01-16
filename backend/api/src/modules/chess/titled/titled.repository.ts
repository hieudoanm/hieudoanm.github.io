import { ChessTitle } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.dto';
import {
  TIME_RANGE_IN_DAYS,
  TIME_RANGE_IN_MILLISECONDS,
} from '@hieudoanm/common/constants/time.constants';
import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { TimeRange } from '@hieudoanm/common/types/time.types';
import { Injectable, Logger } from '@nestjs/common';
import { ChessPlayer, ChessTimeClass, Prisma } from '@prisma/client';
import { TitledStatsDto } from './titled.dto';

@Injectable()
export class TitledRepository {
  private readonly logger = new Logger(TitledRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

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
    const [total = 0, players = []] = await this.prismaService.$transaction([
      this.prismaService.chessPlayer.count({ where }),
      this.prismaService.chessPlayer.findMany({
        where,
        include: { stats: true },
        orderBy: [{ username: 'asc' }],
      }),
    ]);
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

  public async getTitledStats({
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
    ] = await this.prismaService.$transaction([
      this.prismaService.$queryRaw<{ average: number }[]>(
        averageRapidRatingQuery
      ),
      this.prismaService.$queryRaw<{ max: number }[]>(maxRapidRatingQuery),
      this.prismaService.$queryRaw<{ average: number }[]>(
        averageBlitzRatingQuery
      ),
      this.prismaService.$queryRaw<{ max: number }[]>(maxBlitzRatingQuery),
      this.prismaService.$queryRaw<{ average: number }[]>(
        averageBulletRatingQuery
      ),
      this.prismaService.$queryRaw<{ max: number }[]>(maxBulletRatingQuery),
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
