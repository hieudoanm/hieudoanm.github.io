import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EthnicGroupDto } from '../../../generated/ethnicGroup.entity';
import { LicensePlateDto } from '../../../generated/licensePlate.entity';
import {
  EthnicGroupsResponseDto,
  LicensePlatesResponseDto,
} from './vietnam.dto';

@Injectable()
export class VietnamService {
  private readonly logger = new Logger(VietnamService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getEthnicGroups(): Promise<EthnicGroupsResponseDto> {
    const ethnicGroups: EthnicGroupDto[] =
      await this.prismaService.ethnicGroup.findMany();
    const total = ethnicGroups.length;
    return { total, ethnicGroups };
  }

  async getLicensePlates(): Promise<LicensePlatesResponseDto> {
    const licensePlates: LicensePlateDto[] =
      await this.prismaService.licensePlate.findMany();
    const total = licensePlates.length;
    return { total, licensePlates };
  }

  async getLicensePlate(code: string): Promise<LicensePlateDto> {
    const licensePlate: LicensePlateDto =
      await this.prismaService.licensePlate.findFirstOrThrow({
        where: { code },
      });
    return licensePlate;
  }
}
