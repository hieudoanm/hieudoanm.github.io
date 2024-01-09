import { ChessTitle } from '@prisma/client';
import { StreamersRepository } from './streamers.repository';
import { StreamersResponseDto } from './streamers.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Query, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Chess')
@Controller({ version: '1', path: 'chess/streamers' })
@UseInterceptors(CacheInterceptor)
export class StreamersController {
  constructor(private readonly streamersRepository: StreamersRepository) {}

  @Get()
  @ApiQuery({
    name: 'title',
    description: 'title',
    required: false,
  })
  @ApiQuery({
    name: 'country',
    description: 'country',
    required: false,
  })
  @ApiResponse({ status: 200, type: StreamersResponseDto })
  async getStreamers(
    @Query('title') title?: ChessTitle,
    @Query('country') country?: string
  ): Promise<StreamersResponseDto> {
    return this.streamersRepository.getStreamers({ title, country });
  }
}
