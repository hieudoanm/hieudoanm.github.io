import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleResponseDto } from './news.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('google')
  @ApiResponse({ status: 200, type: GoogleResponseDto })
  async getGoogle() {
    return this.newsService.getGoogle();
  }
}
