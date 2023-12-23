import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TarotCardDto } from 'src/generated/tarotCard.entity';
import { TarotCardsResponseDto } from './tarot.dto';

@Injectable()
export class TarotService {
  private readonly logger = new Logger(TarotService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getCards(): Promise<TarotCardsResponseDto> {
    this.logger.log('getCards');
    const cards: TarotCardDto[] = await this.prismaService.tarotCard.findMany();
    const total = cards.length;
    return { total, cards };
  }
}
