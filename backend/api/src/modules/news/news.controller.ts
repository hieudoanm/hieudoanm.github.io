import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleResponseDto, NewsSourcesDto } from './news.dto';
import { NewsService } from './news.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('news')
@Controller({ version: '1', path: 'news' })
@UseInterceptors(CacheInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('google')
  @ApiResponse({
    status: 200,
    type: GoogleResponseDto,
    description: 'List of Google Trends',
  })
  async getGoogle(): Promise<GoogleResponseDto> {
    return this.newsService.getGoogle();
  }

  @Get('sources')
  @ApiResponse({
    status: 200,
    type: NewsSourcesDto,
    description: 'List of News Sources',
  })
  async getSources(): Promise<NewsSourcesDto> {
    return this.newsService.getSources();
  }
}
