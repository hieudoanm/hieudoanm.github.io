import { OrganizationDto } from '@hieudoanm/generated/organization.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationsResponseDto } from './organizations.dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller({ version: '1', path: 'organizations' })
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: OrganizationsResponseDto,
    description: 'List of Organizations',
  })
  async getOrganizations(): Promise<OrganizationsResponseDto> {
    return this.organizationsService.getOrganizations();
  }

  @Get(':code')
  @ApiParam({ name: 'code', type: String, description: 'Organization Code' })
  @ApiResponse({
    status: 200,
    type: OrganizationDto,
    description: 'Get Organization by Code',
  })
  async getOrganization(@Param('code') code: string): Promise<OrganizationDto> {
    return this.organizationsService.getOrganization(code);
  }
}
