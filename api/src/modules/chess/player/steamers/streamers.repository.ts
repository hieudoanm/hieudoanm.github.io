import { Injectable } from '@nestjs/common';
import { Prisma, Title } from '@prisma/client';
import { timeRangeInMilliseconds } from '../../../../common/constants/constants';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { StreamersResponseDto } from './streamers.dto';

@Injectable()
export class StreamersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getStreamers({
    title,
    country,
  }: {
    title?: Title;
    country?: string;
  }): Promise<StreamersResponseDto> {
    const milliseconds: number = timeRangeInMilliseconds.YEAR;
    const d = new Date(Date.now() - milliseconds);
    const [date] = d.toISOString().split('T');
    const mainWhere: Prisma.ChessPlayerWhereInput = {
      isStreamer: true,
      lastOnline: { gte: `${date}T00:00:00Z` },
    };
    let where = { ...mainWhere };
    if (title) {
      where = { ...where, title };
    }
    if (country) {
      where = { ...where, countryCode: country };
    }
    const [countries = [], total = 0, players = []] =
      await this.prismaService.$transaction([
        this.prismaService.chessPlayer.findMany({
          where: { ...mainWhere, title },
          distinct: ['countryCode', 'country'],
          orderBy: { country: 'asc' },
          select: { countryCode: true, country: true },
        }),
        this.prismaService.chessPlayer.count({ where }),
        this.prismaService.chessPlayer.findMany({
          where,
          orderBy: [{ followers: 'desc' }],
        }),
      ]);
    return {
      countries,
      total,
      players,
    };
  }
}
