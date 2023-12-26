import { ApiProperty } from '@nestjs/swagger';
import { TarotCardDto } from '../../../src/generated/tarotCard.entity';

export class TarotCardsResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [TarotCardDto], default: [] })
  cards: TarotCardDto[];
}
