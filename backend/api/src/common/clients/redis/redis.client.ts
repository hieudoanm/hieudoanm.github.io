import { jsonParse } from '@hieudoanm/common/utils/json-parse';
import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

export class RedisClient {
  private readonly logger = new Logger(RedisClient.name);

  private redis: Redis;

  constructor(uri: string) {
    this.redis = new Redis(uri);
  }

  async getObject<T>(key: string): Promise<T | null | undefined> {
    try {
      const data: string | null = await this.redis.get(key);
      return jsonParse<T>(data);
    } catch (error) {
      this.logger.error(`getObject error ${error}`);
      return;
    }
  }

  async setObject<T>(
    key: string,
    value: T,
    { expiresInSeconds = 60 * 30 }: { expiresInSeconds?: number }
  ): Promise<'OK' | 'ERROR'> {
    try {
      const jsonString = JSON.stringify(value);
      return this.redis.set(key, jsonString, 'EX', expiresInSeconds);
    } catch (error) {
      this.logger.error(`setObject error=${error}`);
      return 'ERROR';
    }
  }
}

let redisClient: RedisClient | undefined;

export const getRedisClient = (uri: string) => {
  if (redisClient !== undefined) {
    return redisClient;
  }
  redisClient = new RedisClient(uri);
  return redisClient;
};
