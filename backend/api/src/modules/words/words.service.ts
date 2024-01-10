import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../src/common/prisma/prisma.service';
import { WordsRequestQueryDto, WordsResponseDto } from './words.dto';
import { WordDto } from '../../generated/word.entity';

@Injectable()
export class WordsService {
  private readonly logger = new Logger(WordsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getWords({
    limit = 100,
    offset = 0,
  }: WordsRequestQueryDto): Promise<WordsResponseDto> {
    try {
      const words: WordDto[] = await this.prismaService.word.findMany({
        take: limit,
        skip: offset,
      });
      const total = words.length;
      return { limit, offset, total, words };
    } catch (error) {
      this.logger.log(`getWords error=${error}`);
      return { limit, offset, total: 0, words: [] };
    }
  }

  async getWord(wordQuery: string): Promise<WordDto> {
    try {
      this.logger.log(`getWord word=${wordQuery}`);
      const word: WordDto = await this.prismaService.word.findFirstOrThrow({
        where: { word: wordQuery },
      });
      return word;
    } catch (error) {
      this.logger.log(`getWord error=${error}`);
      return {} as WordDto;
    }
  }
}
