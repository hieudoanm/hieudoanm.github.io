import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GitHubLanguagesResponseDto } from './github.dto';
import { GitHubService } from './github.service';

@ApiTags('github')
@Controller('github')
@UseInterceptors(CacheInterceptor)
export class GitHubController {
  constructor(private readonly gitHubService: GitHubService) {}

  @Get('languages')
  @ApiResponse({
    status: 200,
    type: GitHubLanguagesResponseDto,
    description: 'List of Languages',
  })
  async getLanguages(): Promise<GitHubLanguagesResponseDto> {
    return this.gitHubService.getLanguages();
  }
}
