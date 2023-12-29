import { Injectable, Logger } from '@nestjs/common';
import { ChessPlayer, Prisma } from '@prisma/client';
import { ChessTitle } from '../../../common/clients/apis/chess.com/chess.dto';
import {
  TIME_RANGE_IN_DAYS,
  TIME_RANGE_IN_MILLISECONDS,
} from '../../../common/constants/time.constants';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { TimeRange } from '../../../common/types/time.types';
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
        orderBy: [
          { statsBulletRatingLast: 'desc' },
          { statsBlitzRatingLast: 'desc' },
          { statsRapidRatingLast: 'desc' },
          { username: 'asc' },
        ],
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
    timeControl,
  }: {
    title: string;
    timeRange: TimeRange;
    timeControl: string;
  }): Prisma.Sql {
    const days: number = TIME_RANGE_IN_DAYS.get(timeRange);
    const query: string = `SELECT AVG(p."stats${timeControl}RatingLast") as "average" FROM public."Player" as p WHERE p."title" = '${title}' AND p."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day) AND p."stats${timeControl}RatingLast" != 0;`;
    this.logger.log(`buildAverageRatingQuery query=${query}`);
    return Prisma.raw(query);
  }

  private buildMaxAverageRating({
    title,
    timeRange,
    timeControl,
  }: {
    title: string;
    timeRange: TimeRange;
    timeControl: string;
  }): Prisma.Sql {
    const days: number = TIME_RANGE_IN_DAYS.get(timeRange);
    const query: string = `SELECT MAX(p."stats${timeControl}RatingLast") as "max" FROM public."Player" as p WHERE p."title" = '${title}' AND p."lastOnline" > (CURRENT_DATE - INTERVAL '${days}' day) AND p."stats${timeControl}RatingLast" != 0;`;
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
      timeControl: 'Rapid',
    });
    const maxRapidRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeControl: 'Rapid',
    });
    const averageBlitzRatingQuery = this.buildAverageRatingQuery({
      title,
      timeRange,
      timeControl: 'Blitz',
    });
    const maxBlitzRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeControl: 'Blitz',
    });
    const averageBulletRatingQuery = this.buildAverageRatingQuery({
      title,
      timeRange,
      timeControl: 'Bullet',
    });
    const maxBulletRatingQuery = this.buildMaxAverageRating({
      title,
      timeRange,
      timeControl: 'Bullet',
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
