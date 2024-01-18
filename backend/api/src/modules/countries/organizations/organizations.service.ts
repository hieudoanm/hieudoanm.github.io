import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { OrganizationDto } from '@hieudoanm/generated/organization.entity';
import { Injectable, Logger } from '@nestjs/common';
import { OrganizationsResponseDto } from './organizations.dto';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getOrganizations(): Promise<OrganizationsResponseDto> {
    const organizations: OrganizationDto[] =
      await this.prismaService.organization.findMany({
        include: { countries: true },
      });
    const total = organizations.length;
    return { total, organizations };
  }

  async getOrganization(code: string): Promise<OrganizationDto> {
    const organization: OrganizationDto =
      await this.prismaService.organization.findFirstOrThrow({
        where: { code },
        include: { countries: true },
      });
    return organization;
  }
}
