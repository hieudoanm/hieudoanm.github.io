import { Injectable } from '@nestjs/common';
import { ChessTimeClass, Prisma } from '@prisma/client';
import { CountriesResponseDto, CountryResponseDto } from './countries.dto';
import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';

@Injectable()
export class CountriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCountries(): Promise<CountryResponseDto[]> {
    const query: string = `SELECT p."countryCode", p."country", COUNT(p."id") as total
FROM chess."ChessPlayer" as p
WHERE p."title" IS NOT NULL AND p."lastOnline" > (CURRENT_DATE - INTERVAL '1' year)
GROUP BY p."country", p."countryCode"
ORDER BY total DESC, p."country" ASC;`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return this.prismaService.$queryRaw<CountryResponseDto[]>(sql);
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

  public async getTitledPlayersByCountry(
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
    ] = await this.prismaService.$transaction([
      this.prismaService.chessPlayer.count({ where }),
      this.prismaService.chessPlayer.findMany({
        where,
        include: { stats: true },
      }),
      this.prismaService.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.rapid,
          last: { gt: 0 },
        },
      }),
      this.prismaService.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.blitz,
          last: { gt: 0 },
        },
      }),
      this.prismaService.chessStats.aggregate({
        _avg: { last: true },
        where: {
          timeClass: ChessTimeClass.bullet,
          last: { gt: 0 },
        },
      }),
      this.prismaService.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.rapid,
          last: { gt: 0 },
        },
      }),
      this.prismaService.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.blitz,
          last: { gt: 0 },
        },
      }),
      this.prismaService.chessStats.aggregate({
        _max: { last: true },
        where: {
          timeClass: ChessTimeClass.bullet,
          last: { gt: 0 },
        },
      }),
      this.prismaService.$queryRaw<{ title: string; total: number }[]>(
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
