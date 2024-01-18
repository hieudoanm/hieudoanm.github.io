import { TarotCardDto } from '@hieudoanm/generated/tarotCard.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TarotCardType } from '@prisma/client';

export class TarotCardsResponseDto {
  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ enum: TarotCardType })
  types: TarotCardType[];

  @ApiProperty({ type: [String] })
  suits: string[];

  @ApiProperty({ type: [TarotCardDto], default: [] })
  cards: TarotCardDto[];
}
