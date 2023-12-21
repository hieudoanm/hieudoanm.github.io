import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleResponseDto, NewsSourcesDto } from './news.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('google')
  @ApiResponse({ status: 200, type: GoogleResponseDto })
  async getGoogle(): Promise<GoogleResponseDto> {
    return this.newsService.getGoogle();
  }

  @Get('sources')
  @ApiResponse({ status: 200, type: NewsSourcesDto })
  async getSources(): Promise<NewsSourcesDto> {
    return this.newsService.getSources();
  }
}
