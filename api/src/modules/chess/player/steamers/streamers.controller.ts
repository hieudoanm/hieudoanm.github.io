import { Title } from '@prisma/client';
import { StreamersRepository } from './streamers.repository';
import { StreamersResponseDto } from './streamers.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Query, Get } from '@nestjs/common';

@Controller('streamers')
@ApiTags('Chess')
export class StreamersController {
  constructor(private readonly streamersRepository: StreamersRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: StreamersResponseDto })
  async getStreamers(
    @Query('title') title?: Title,
    @Query('country') country?: string
  ): Promise<StreamersResponseDto> {
    return this.streamersRepository.getStreamers({ title, country });
  }
}
