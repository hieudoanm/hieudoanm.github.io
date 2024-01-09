import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChessTitle } from '../../../common/clients/apis/chess.com/chess.dto';
import { TimeRange } from '../../../common/types/time.types';
import { TitledStatsDto, TitlesDto } from './titled.dto';
import { TitledService } from './titled.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Chess')
@Controller({ version: '1', path: 'chess/titled' })
@UseInterceptors(CacheInterceptor)
export class TitledController {
  constructor(private readonly titledService: TitledService) {}

  @Get()
  @ApiResponse({ status: 200, type: TitlesDto })
  getTitles(): TitlesDto {
    const titles: string[] = [
      'GM',
      'IM',
      'FM',
      'CM',
      'NM',
      'WGM',
      'WIM',
      'WFM',
      'WCM',
      'WNM',
    ];
    return { total: titles.length, titles };
  }

  @Get(':title')
  @ApiParam({ name: 'title', description: 'title' })
  @ApiQuery({
    name: 'cache',
    description: 'cache',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'timeRange',
    description: 'timeRange',
    required: false,
  })
  @ApiResponse({ status: 200, type: TitledStatsDto })
  async getTitledStats(
    @Param('title') title: ChessTitle,
    @Query('cache') cache: boolean = true,
    @Query('timeRange') timeRange: TimeRange = 'year'
  ): Promise<TitledStatsDto> {
    return this.titledService.getTitledStats({ cache, title, timeRange });
  }
}
