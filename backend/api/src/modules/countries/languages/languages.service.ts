import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { Injectable, Logger } from '@nestjs/common';
import { LanguagesResponseDto } from './languages.dto';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name);

  constructor(private readonly prismaPublicClient: PrismaPublicClient) {}

  async getLanguages(): Promise<LanguagesResponseDto> {
    const languages = await this.prismaPublicClient.language.findMany({
      orderBy: { code: 'asc' },
      include: { countries: true },
    });
    const total = languages.length;
    return { total, languages };
  }
}
