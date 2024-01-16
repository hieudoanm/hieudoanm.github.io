import { ChessTitle } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.dto';
import {
  RedisClient,
  getRedisClient,
} from '@hieudoanm/common/clients/redis/redis.client';
import { REDIS_URI } from '@hieudoanm/common/environments/environments';
import { TimeRange } from '@hieudoanm/common/types/time.types';
import { Injectable, Logger } from '@nestjs/common';
import { TitledStatsDto } from './titled.dto';
import { TitledRepository } from './titled.repository';

@Injectable()
export class TitledService {
  private readonly logger = new Logger(TitledService.name);

  private redisClient: RedisClient;

  constructor(private readonly titledRepository: TitledRepository) {
    this.redisClient = getRedisClient(REDIS_URI);
  }

  public async getTitledStats({
    title,
    cache = true,
    timeRange = 'year',
  }: {
    cache: boolean;
    title: ChessTitle;
    timeRange: TimeRange;
  }): Promise<TitledStatsDto> {
    const key: string = `chess-titled-${title}-${timeRange}`.toLowerCase();
    if (cache) {
      const cacheTitledStats: TitledStatsDto | null | undefined =
        await this.redisClient.getObject<TitledStatsDto>(key);
      if (cacheTitledStats) {
        return cacheTitledStats;
      }
    }
    const titledStats: TitledStatsDto =
      await this.titledRepository.getTitledStats({ title, timeRange });
    await this.redisClient.setObject<TitledStatsDto>(key, titledStats, {
      expiresInSeconds: 30 * 60, // 30 minutes
    });
    return titledStats;
  }
}
