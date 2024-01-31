import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgrammingLanguagesResponseDto, StatusDto } from './linus.dto';
import { LinusService } from './linus.service';
import { Service } from '@hieudoanm/common/clients/apis/status/status.dto';

@ApiTags('linus')
@Controller({ version: '1', path: 'linus' })
@UseInterceptors(CacheInterceptor)
export class LinusController {
  constructor(private readonly linusService: LinusService) {}

  @Get('languages')
  @ApiResponse({
    status: 200,
    type: ProgrammingLanguagesResponseDto,
    description: 'List of Languages',
  })
  async getLanguages(): Promise<ProgrammingLanguagesResponseDto> {
    return this.linusService.getLanguages();
  }

  @Get('service/:service')
  @ApiResponse({
    status: 200,
    type: StatusDto,
    description: 'Service Status',
  })
  async getSources(@Param('service') service: Service): Promise<StatusDto> {
    return this.linusService.getServiceStatus(service);
  }
}
