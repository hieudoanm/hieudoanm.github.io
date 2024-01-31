import { StatusClient } from '@hieudoanm/common/clients/apis/status/status.client';
import { Service } from '@hieudoanm/common/clients/apis/status/status.dto';
import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { ProgrammingLanguageDto } from '@hieudoanm/generated/prisma/dto/programmingLanguage.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ProgrammingLanguagesResponseDto, StatusDto } from './linus.dto';

@Injectable()
export class LinusService {
  private readonly logger = new Logger(LinusService.name);

  constructor(
    private readonly prismaPublicClient: PrismaPublicClient,
    private readonly statusClient: StatusClient
  ) {}

  async getLanguages(): Promise<ProgrammingLanguagesResponseDto> {
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

  async getServiceStatus(service: Service): Promise<StatusDto> {
    return this.statusClient.getServiceStatus(service);
  }
}
