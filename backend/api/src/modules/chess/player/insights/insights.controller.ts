import { Controller, Get, Param } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsDto } from './insights.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Chess')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get('player/:username/insights')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getInsights(
    @Param('username') username: string
  ): Promise<InsightsDto> {
    return this.insightsService.getInsights(username);
  }

  @Get('player/:username/insights/games')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getGamesInsights(
    @Param('username') username: string
  ): Promise<Pick<InsightsDto, 'username' | 'games'>> {
    return this.insightsService.getGamesInsights(username);
  }

  @Get('player/:username/insights/accuracy')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getAccuracyInsights(
    @Param('username') username: string
  ): Promise<Pick<InsightsDto, 'username' | 'accuracy'>> {
    return this.insightsService.getAccuracyInsights(username);
  }

  @Get('player/:username/insights/results')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getResultsInsights(
    @Param('username') username: string
  ): Promise<Pick<InsightsDto, 'username' | 'results'>> {
    return this.insightsService.getResultsInsights(username);
  }

  @Get('player/:username/insights/opponents')
  @ApiResponse({ status: 200, type: InsightsDto })
  public async getResultsOpponents(
    @Param('username') username: string
  ): Promise<Pick<InsightsDto, 'username' | 'opponents'> & { total: number }> {
    return this.insightsService.getOpponentsInsights(username);
  }
}
