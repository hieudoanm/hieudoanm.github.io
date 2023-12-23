import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TarotService } from './tarot.service';
import { TarotCardsResponseDto } from './tarot.dto';

@ApiTags('tarot')
@Controller('tarot')
export class TarotController {
  constructor(private readonly tarotService: TarotService) {}

  @Get('cards')
  @ApiResponse({ status: 200, type: TarotCardsResponseDto })
  async getCards(): Promise<TarotCardsResponseDto> {
    return this.tarotService.getCards();
  }
}
