import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LicensePlateDto } from '../../../../src/generated/licensePlate.entity';
import {
  EthnicGroupsResponseDto,
  LicensePlatesResponseDto,
} from './vietnam.dto';
import { VietnamService } from './vietnam.service';

@ApiTags('vietnam')
@Controller({ version: '1', path: 'vietnam' })
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

  @Get('license-plates/:code')
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    type: LicensePlateDto,
    description: 'Get License Plate by Code',
  })
  async getLicensePlate(@Param('code') code): Promise<LicensePlateDto> {
    return this.vietnamService.getLicensePlate(code);
  }
}
