import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { LanguagesResponseDto } from './languages.dto';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getLanguages(): Promise<LanguagesResponseDto> {
    const languages = await this.prismaService.language.findMany({
      orderBy: { code: 'asc' },
      include: { countries: true },
    });
    const total = languages.length;
    return { total, languages };
  }
}
