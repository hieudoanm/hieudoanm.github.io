import { TIME_RANGE_IN_MILLISECONDS } from '@hieudoanm/common/constants/time.constants';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { Injectable } from '@nestjs/common';
import { ChessTitle, Prisma } from '@hieudoanm/generated/prisma/chess/client';
import { StreamersResponseDto } from './streamers.dto';

@Injectable()
export class StreamersRepository {
  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  async getStreamers({
    title,
    country,
  }: {
    title?: ChessTitle;
    country?: string;
  }): Promise<StreamersResponseDto> {
    const milliseconds: number = TIME_RANGE_IN_MILLISECONDS.get('year');
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
      await this.prismaChessClient.$transaction([
        this.prismaChessClient.chessPlayer.findMany({
          select: { countryCode: true, country: true },
          distinct: ['countryCode', 'country'],
          where: { ...mainWhere, title },
          orderBy: { country: 'asc' },
        }),
        this.prismaChessClient.chessPlayer.count({ where }),
        this.prismaChessClient.chessPlayer.findMany({
          where,
          include: { stats: true },
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
