import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ProgrammingLanguageDto } from '../../generated/programmingLanguage.entity';
import { GitHubLanguagesResponseDto } from './github.dto';

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getLanguages(): Promise<GitHubLanguagesResponseDto> {
    try {
      const languages: ProgrammingLanguageDto[] =
        await this.prismaService.programmingLanguage.findMany();
      const total = languages.length;
      return { total, languages };
    } catch (error) {
      this.logger.log(`getWords error=${error}`);
      return { total: 0, languages: [] };
    }
  }
}
