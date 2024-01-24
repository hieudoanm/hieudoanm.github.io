import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InsightsDto } from './insights.dto';
import { InsightsService } from './insights.service';

@ApiTags('chess')
@Controller({ version: '1', path: 'chess' })
@UseInterceptors(CacheInterceptor)
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('players/:username/insights')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getInsights(
    @Param('username') username: string = 'hikaru'
  ): Promise<InsightsDto> {
    return this.insightsService.getInsights(username);
  }

  @Get('players/:username/insights/games')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getGamesInsights(
    @Param('username') username: string = 'hikaru'
  ): Promise<Pick<InsightsDto, 'username' | 'games'>> {
    return this.insightsService.getGamesInsights(username);
  }

  @Get('players/:username/insights/accuracy')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getAccuracyInsights(
    @Param('username') username: string = 'hikaru'
  ): Promise<Pick<InsightsDto, 'username' | 'accuracy'>> {
    return this.insightsService.getAccuracyInsights(username);
  }

  @Get('players/:username/insights/results')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getResultsInsights(
    @Param('username') username: string = 'hikaru'
  ): Promise<Pick<InsightsDto, 'username' | 'results'>> {
    return this.insightsService.getResultsInsights(username);
  }

  @Get('players/:username/insights/opponents')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getResultsOpponents(
    @Param('username') username: string = 'hikaru'
  ): Promise<Pick<InsightsDto, 'username' | 'opponents'> & { total: number }> {
    return this.insightsService.getOpponentsInsights(username);
  }
}
