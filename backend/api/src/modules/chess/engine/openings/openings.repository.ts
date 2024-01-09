import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { ChessOpeningDto } from '../../../../generated/chessOpening.entity';
import { EcosResponseDto, OpeningsResponseDto } from './openings.dto';

@Injectable()
export class OpeningsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getOpenings({
    eco = '',
    name = '',
  }: {
    eco: string;
    name: string;
  }): Promise<OpeningsResponseDto> {
    let where: Prisma.ChessOpeningWhereInput = {};
    if (eco !== '') {
      where = { ...where, eco };
    }
    if (name !== '') {
      where = { ...where, name: { contains: name, mode: 'insensitive' } };
    }
    const [total = 0, openings = []] = await this.prismaService.$transaction([
      this.prismaService.chessOpening.count({ where }),
      this.prismaService.chessOpening.findMany({
        where,
        orderBy: [{ eco: 'asc' }, { name: 'asc' }],
      }),
    ]);
    return { total, openings };
  }

  public async getECOs(): Promise<EcosResponseDto> {
    const results = await this.prismaService.chessOpening.findMany({
      select: { eco: true },
      distinct: ['eco'],
    });
    const total = results.length;
    const ecos = results.map(({ eco }) => eco);
    return { total, ecos };
  }

  public async getOpening(eco = '', name = ''): Promise<ChessOpeningDto> {
    const where: Prisma.ChessOpeningWhereInput | undefined =
      eco !== '' && name !== '' ? { eco, name } : undefined;
    const opening: ChessOpeningDto =
      await this.prismaService.chessOpening.findFirstOrThrow({
        where,
      });
    return opening;
  }
}
