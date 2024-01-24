import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { WordDto } from '@hieudoanm/generated/prisma/public/dto/word.entity';
import { Injectable, Logger } from '@nestjs/common';
import { WordsRequestQueryDto, WordsResponseDto } from './words.dto';

@Injectable()
export class WordsService {
  private readonly logger = new Logger(WordsService.name);

  constructor(private readonly prismaPublicClient: PrismaPublicClient) {}

  async getWords({
    limit = 100,
    offset = 0,
  }: WordsRequestQueryDto): Promise<WordsResponseDto> {
    try {
      const words: WordDto[] = await this.prismaPublicClient.word.findMany({
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
      const word: WordDto = await this.prismaPublicClient.word.findFirstOrThrow(
        {
          where: { word: wordQuery },
        }
      );
      return word;
    } catch (error) {
      this.logger.log(`getWord error=${error}`);
      return {} as WordDto;
    }
  }
}
