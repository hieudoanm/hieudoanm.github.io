import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { OrganizationDto } from '@hieudoanm/generated/prisma/public/dto/organization.entity';
import { Injectable, Logger } from '@nestjs/common';
import { OrganizationsResponseDto } from './organizations.dto';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(private readonly prismaPublicClient: PrismaPublicClient) {}

  async getOrganizations(): Promise<OrganizationsResponseDto> {
    const organizations: OrganizationDto[] =
      await this.prismaPublicClient.organization.findMany({
        include: { countries: true },
      });
    const total = organizations.length;
    return { total, organizations };
  }

  async getOrganization(code: string): Promise<OrganizationDto> {
    const organization: OrganizationDto =
      await this.prismaPublicClient.organization.findFirstOrThrow({
        where: { code },
        include: { countries: true },
      });
    return organization;
  }
}
