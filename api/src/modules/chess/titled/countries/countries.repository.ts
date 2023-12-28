import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CountriesResponseDto, CountryResponseDto } from './countries.dto';
import { PrismaService } from '../../../../common/prisma/prisma.service';

@Injectable()
export class CountriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCountries(): Promise<CountryResponseDto[]> {
    const query: string = `SELECT p."countryCode", p."country", COUNT(p."id") as total
FROM public."Player" as p
WHERE p."title" IS NOT NULL AND p."lastOnline" > (CURRENT_DATE - INTERVAL '1' year)
GROUP BY p."country", p."countryCode"
ORDER BY total DESC, p."country" ASC;`;
    const sql: Prisma.Sql = Prisma.raw(query);
    return this.prismaService.$queryRaw<CountryResponseDto[]>(sql);
  }

  public async getTitledPlayersByCountry(
    countryCode: string
  ): Promise<CountriesResponseDto> {
    const where = { countryCode, title: { not: null } };
    const [
      total = 0,
      players = [],
      {
        _avg: { statsRapidRatingLast: averageRapidRating = 0 },
      },
      {
        _avg: { statsBlitzRatingLast: averageBlitzRating = 0 },
      },
      {
        _avg: { statsBulletRatingLast: averageBulletRating = 0 },
      },
      {
        _max: { statsRapidRatingLast: maxRapidRating = 0 },
      },
      {
        _max: { statsBlitzRatingLast: maxBlitzRating = 0 },
      },
      {
        _max: { statsBulletRatingLast: maxBulletRating = 0 },
      },
      titles = [],
    ] = await this.prismaService.$transaction([
      this.prismaService.chessPlayer.count({ where }),
      this.prismaService.chessPlayer.findMany({
        where,
        orderBy: [
          { statsBulletRatingLast: 'desc' },
          { statsBlitzRatingLast: 'desc' },
          { statsRapidRatingLast: 'desc' },
        ],
      }),
      this.prismaService.chessPlayer.aggregate({
        _avg: { statsRapidRatingLast: true },
        where: { ...where, statsRapidRatingLast: { gt: 0 } },
      }),
      this.prismaService.chessPlayer.aggregate({
        _avg: { statsBlitzRatingLast: true },
        where: { ...where, statsBlitzRatingLast: { gt: 0 } },
      }),
      this.prismaService.chessPlayer.aggregate({
        _avg: { statsBulletRatingLast: true },
        where: { ...where, statsBulletRatingLast: { gt: 0 } },
      }),
      this.prismaService.chessPlayer.aggregate({
        _max: { statsRapidRatingLast: true },
        where: { ...where, statsRapidRatingLast: { gt: 0 } },
      }),
      this.prismaService.chessPlayer.aggregate({
        _max: { statsBlitzRatingLast: true },
        where: { ...where, statsBlitzRatingLast: { gt: 0 } },
      }),
      this.prismaService.chessPlayer.aggregate({
        _max: { statsBulletRatingLast: true },
        where: { ...where, statsBulletRatingLast: { gt: 0 } },
      }),
      // this.prismaService.chessPlayer.groupBy({
      //   where,
      //   by: ['title'],
      //   _count: { title: true },
      //   orderBy: { _count: { title: 'desc' } },
      // }),
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
      titles: titles.map(({ _count, title = '' }) => ({
        title: title ?? '',
        total: (_count?.valueOf() as Record<string, number>).title ?? 0,
      })),
    };
  }
}
