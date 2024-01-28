import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { ProgrammingLanguageDto } from '@hieudoanm/generated/prisma/dto/programmingLanguage.entity';
import { Injectable, Logger } from '@nestjs/common';
import { GitHubLanguagesResponseDto } from './github.dto';

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  constructor(private readonly prismaPublicClient: PrismaPublicClient) {}

  async getLanguages(): Promise<GitHubLanguagesResponseDto> {
    try {
      const languages: ProgrammingLanguageDto[] =
        await this.prismaPublicClient.programmingLanguage.findMany();
      const total = languages.length;
      return { total, languages };
    } catch (error) {
      this.logger.log(`getWords error=${error}`);
      return { total: 0, languages: [] };
    }
  }
}
