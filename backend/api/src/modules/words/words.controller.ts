import { WordDto } from '@hieudoanm/generated/prisma/public/dto/word.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WordsRequestQueryDto, WordsResponseDto } from './words.dto';
import { WordsService } from './words.service';

@ApiTags('words')
@Controller({ version: '1', path: 'words' })
@UseInterceptors(CacheInterceptor)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @ApiQuery({
    name: 'limit',
    description: 'Limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: 'Offset',
    type: Number,
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: WordsResponseDto,
    description: 'List of Words',
  })
  async getWords(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    { limit = 100, offset = 0 }: WordsRequestQueryDto
  ): Promise<WordsResponseDto> {
    return this.wordsService.getWords({ limit, offset });
  }

  @Get(':word')
  @ApiQuery({ name: 'word', type: String })
  @ApiResponse({
    status: 200,
    type: WordDto,
    description: 'Get Words Card by ID',
  })
  async getWord(@Param('word') word): Promise<WordDto> {
    return this.wordsService.getWord(word);
  }
}
