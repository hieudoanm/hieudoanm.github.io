import { TarotCardDto } from '@hieudoanm/generated/prisma/public/dto/tarotCard.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TarotCardType } from '@hieudoanm/generated/prisma/public/client';
import { TarotCardsResponseDto } from './tarot.dto';
import { TarotService } from './tarot.service';

@ApiTags('tarot')
@Controller({ version: '1', path: 'tarot' })
@UseInterceptors(CacheInterceptor)
export class TarotController {
  constructor(private readonly tarotService: TarotService) {}

  @Get('cards')
  @ApiQuery({
    name: 'type',
    enum: TarotCardType,
    description: 'Tarot Type',
    required: false,
  })
  @ApiQuery({
    name: 'suit',
    type: String,
    description: 'Tarot Suit',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit',
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: TarotCardsResponseDto,
    description: 'List of Tarot Cards',
  })
  async getCards(
    @Query('type') type: TarotCardType,
    @Query('suit') suit: string,
    @Query('limit') limit = 78
  ): Promise<TarotCardsResponseDto> {
    return this.tarotService.getCards({ limit, type, suit });
  }

  @Get('cards/:id')
  @ApiQuery({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: TarotCardDto,
    description: 'Get Tarot Card by ID',
  })
  async getCard(@Param('id') id): Promise<TarotCardDto> {
    return this.tarotService.getCard(id);
  }
}
