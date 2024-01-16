import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { TarotCardType } from '@prisma/client';
import { TarotCardDto } from '@hieudoanm/generated/tarotCard.entity';
import { TarotCardsResponseDto } from './tarot.dto';

@Injectable()
export class TarotService {
  private readonly logger = new Logger(TarotService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getCards({
    type,
    suit,
    limit = 78,
  }: {
    type: TarotCardType;
    suit: string;
    limit: number;
  }): Promise<TarotCardsResponseDto> {
    try {
      this.logger.log(`getCards type=${type} suit=${suit} limit=${limit}`);
      const where = { type, suit };
      const cards: TarotCardDto[] = await this.prismaService.tarotCard.findMany(
        { where, take: limit }
      );
      const types = (
        await this.prismaService.tarotCard.findMany({
          select: { type: true },
          distinct: ['type'],
          where,
        })
      ).map(({ type }) => type);
      const suits = (
        await this.prismaService.tarotCard.findMany({
          select: { suit: true },
          distinct: ['suit'],
          where,
        })
      ).map(({ suit }) => suit);
      const total = cards.length;
      return { total, types, suits, cards };
    } catch (error) {
      this.logger.log(`getCards error=${error}`);
      return { total: 0, types: [], suits: [], cards: [] };
    }
  }

  async getCard(id: string): Promise<TarotCardDto> {
    this.logger.log(`getCard id=${id}`);
    const card: TarotCardDto =
      await this.prismaService.tarotCard.findFirstOrThrow({
        where: { id },
      });
    return card;
  }
}
