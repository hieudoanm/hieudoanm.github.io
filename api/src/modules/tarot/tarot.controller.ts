import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TarotCardsResponseDto } from './tarot.dto';
import { TarotService } from './tarot.service';

@ApiTags('tarot')
@Controller('tarot')
@UseInterceptors(CacheInterceptor)
export class TarotController {
  constructor(private readonly tarotService: TarotService) {}

  @Get('cards')
  @ApiResponse({
    status: 200,
    type: TarotCardsResponseDto,
    description: 'List of Tarot Cards',
  })
  async getCards(): Promise<TarotCardsResponseDto> {
    return this.tarotService.getCards();
  }
}
