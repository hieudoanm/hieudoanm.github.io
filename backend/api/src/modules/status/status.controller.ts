import { Controller, UseInterceptors, Get, Param } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from './status.dto';
import { StatusClient } from '@hieudoanm/common/clients/apis/status/status.client';
import { Service } from '@hieudoanm/common/clients/apis/status/status.dto';

@ApiTags('status')
@Controller({ version: '1', path: 'status' })
@UseInterceptors(CacheInterceptor)
export class StatusController {
  constructor(private readonly statusClient: StatusClient) {}

  @Get(':service')
  @ApiResponse({
    status: 200,
    type: StatusDto,
    description: 'Service Status',
  })
  async getSources(@Param('service') service: Service): Promise<StatusDto> {
    return this.statusClient.getServiceStatus(service);
  }
}
