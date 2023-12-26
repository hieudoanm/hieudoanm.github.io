import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VietnamService } from './vietnam.service';
import {
  EthnicGroupsResponseDto,
  LicensePlatesResponseDto,
} from './vietnam.dto';

@ApiTags('vietnam')
@Controller('vietnam')
export class VietnamController {
  constructor(private readonly vietnamService: VietnamService) {}

  @Get('ethnic-groups')
  @ApiResponse({
    status: 200,
    type: EthnicGroupsResponseDto,
    description: 'List of Ethnic Groups',
  })
  async getEthnicGroups(): Promise<EthnicGroupsResponseDto> {
    return this.vietnamService.getEthnicGroups();
  }

  @Get('license-plates')
  @ApiResponse({
    status: 200,
    type: LicensePlatesResponseDto,
    description: 'List of License Plates',
  })
  async getLicensePlates(): Promise<LicensePlatesResponseDto> {
    return this.vietnamService.getLicensePlates();
  }
}
