import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.client';
import { EthnicGroupDto } from '@hieudoanm/generated/prisma/dto/ethnicGroup.entity';
import { LicensePlateDto } from '@hieudoanm/generated/prisma/dto/licensePlate.entity';
import { Injectable, Logger } from '@nestjs/common';
import {
  EthnicGroupsResponseDto,
  LicensePlatesResponseDto,
} from './vietnam.dto';

@Injectable()
export class VietnamService {
  private readonly logger = new Logger(VietnamService.name);

  constructor(private readonly prismaPublicClient: PrismaPublicClient) {}

  async getEthnicGroups(): Promise<EthnicGroupsResponseDto> {
    const ethnicGroups: EthnicGroupDto[] =
      await this.prismaPublicClient.ethnicGroup.findMany();
    const total = ethnicGroups.length;
    return { total, ethnicGroups };
  }

  async getLicensePlates(): Promise<LicensePlatesResponseDto> {
    const licensePlates: LicensePlateDto[] =
      await this.prismaPublicClient.licensePlate.findMany();
    const total = licensePlates.length;
    return { total, licensePlates };
  }

  async getLicensePlate(code: string): Promise<LicensePlateDto> {
    const licensePlate: LicensePlateDto =
      await this.prismaPublicClient.licensePlate.findFirstOrThrow({
        where: { code },
      });
    return licensePlate;
  }
}
