import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { ChessOpeningDto } from '@hieudoanm/generated/prisma/chess/dto/chessOpening.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@hieudoanm/generated/prisma/chess/client';
import { EcosResponseDto, OpeningsResponseDto } from './openings.dto';

@Injectable()
export class OpeningsRepository {
  constructor(private readonly prismaChessClient: PrismaChessClient) {}

  async getOpenings({
    eco = '',
    name = '',
    limit = 100,
    offset = 0,
  }: {
    eco: string;
    name: string;
    limit: number;
    offset: number;
  }): Promise<OpeningsResponseDto> {
    let where: Prisma.ChessOpeningWhereInput = {};
    if (eco !== '') {
      where = { ...where, eco };
    }
    if (name !== '') {
      where = { ...where, name: { contains: name, mode: 'insensitive' } };
    }
    const [total = 0, openings = []] =
      await this.prismaChessClient.$transaction([
        this.prismaChessClient.chessOpening.count({
          where,
          take: limit,
          skip: offset,
        }),
        this.prismaChessClient.chessOpening.findMany({
          where,
          take: limit,
          skip: offset,
          orderBy: [{ eco: 'asc' }, { name: 'asc' }],
        }),
      ]);
    return { total, openings };
  }

  async getECOs(): Promise<EcosResponseDto> {
    const results = await this.prismaChessClient.chessOpening.findMany({
      select: { eco: true },
      distinct: ['eco'],
    });
    const total = results.length;
    const ecos = results.map(({ eco }) => eco);
    return { total, ecos };
  }

  async getOpening(eco = '', name = ''): Promise<ChessOpeningDto> {
    const where: Prisma.ChessOpeningWhereInput | undefined =
      eco !== '' && name !== '' ? { eco, name } : undefined;
    const opening: ChessOpeningDto =
      await this.prismaChessClient.chessOpening.findFirstOrThrow({
        where,
      });
    return opening;
  }
}
