import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { Injectable } from '@nestjs/common';
import {
  ChessTimeClass,
  Prisma,
} from '@hieudoanm/generated/prisma/chess/client';
import { CountriesResponseDto, CountryResponseDto } from './countries.dto';

@Injectable()
export class CountriesRepository {
  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  async getCountries(): Promise<CountryResponseDto[]> {
    const query: string = `SELECT p."countryCode", p."country", COUNT(p."id") as total
FROM chess."ChessPlayer" as p
WHERE p."title" IS NOT NULL AND p."lastOnline" > (CURRENT_DATE - INTERVAL '1' year)
GROUP BY p."country", p."countryCode"
ORDER BY total DESC, p."country" ASC;`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return this.prismaChessClient.$queryRaw<CountryResponseDto[]>(sql);
  }

  private countTitledPlayers(countryCode: string) {
    const query = `SELECT player."title", COUNT(*) as total
FROM chess."ChessPlayer" AS player
WHERE player."countryCode" = '${countryCode}'
AND player."title" IS NOT NULL
GROUP BY player."title"
ORDER BY player."title";`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return sql;
  }

  async getTitledPlayersByCountry(
    countryCode: string
  ): Promise<CountriesResponseDto> {
    const where = { countryCode, title: { not: null } };
    const [
      total = 0,
      players = [],
      {
        _avg: { last: averageRapidRating = 0 },
      },
      {
        _avg: { last: averageBlitzRating = 0 },
      },
      {
        _avg: { last: averageBulletRating = 0 },
      },
      {
        _max: { last: maxRapidRating = 0 },
      },
      {
        _max: { last: maxBlitzRating = 0 },
      },
      {
        _max: { last: maxBulletRating = 0 },
      },
      titles = [],
    ] = await this.prismaChessClient.$transaction([
      this.prismaChessClient.chessPlayer.count({ where }),
      this.prismaChessClient.chessPlayer.findMany({
        where,
        include: { stats: true },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.rapid,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.blitz,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.bullet,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.rapid,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.blitz,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.bullet,
          last: { gt: 0 },
        },
      }),
      this.prismaChessClient.$queryRaw<{ title: string; total: number }[]>(
        this.countTitledPlayers(countryCode)
      ),
    ]);
    return {
      averageRapidRating: averageRapidRating ?? 0,
      averageBlitzRating: averageBlitzRating ?? 0,
      averageBulletRating: averageBulletRating ?? 0,
      maxRapidRating: maxRapidRating ?? 0,
      maxBlitzRating: maxBlitzRating ?? 0,
      maxBulletRating: maxBulletRating ?? 0,
      total,
      players,
      titles,
    };
  }
}
