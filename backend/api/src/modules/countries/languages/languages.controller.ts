import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguagesResponseDto } from './languages.dto';
import { LanguagesService } from './languages.service';

@ApiTags('languages')
@Controller({ version: '1', path: 'languages' })
@UseInterceptors(CacheInterceptor)
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: LanguagesResponseDto,
    description: 'List of Languages',
  })
  async getLanguages(): Promise<LanguagesResponseDto> {
    return this.languagesService.getLanguages();
  }
}
