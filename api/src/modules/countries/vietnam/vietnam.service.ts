import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LicensePlateDto } from 'src/generated/licensePlate.entity';
import { LicensePlatesResponseDto } from './vietnam.dto';

@Injectable()
export class VietnamService {
  private readonly logger = new Logger(VietnamService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getLicensePlates(): Promise<LicensePlatesResponseDto> {
    const licensePlates: LicensePlateDto[] =
      await this.prismaService.licensePlate.findMany();
    const total = licensePlates.length;
    return { total, licensePlates };
  }
}
