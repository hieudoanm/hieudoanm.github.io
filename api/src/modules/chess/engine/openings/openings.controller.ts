import { OpeningsRepository } from './openings.repository';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { EcosResponseDto, OpeningsResponseDto } from './openings.dto';

@Controller('openings')
@ApiTags('Chess')
export class OpeningsController {
  constructor(private readonly openingsRepository: OpeningsRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: OpeningsResponseDto })
  public async getOpenings(
    @Query('eco') eco: string = '',
    @Query('name') name: string = '',
    @Query('firstMove') firstMove: string = ''
  ): Promise<OpeningsResponseDto> {
    return this.openingsRepository.getOpenings({ eco, name, firstMove });
  }

  @Get('ecos')
  @ApiResponse({ status: 200, type: EcosResponseDto })
  public async getECOs(): Promise<EcosResponseDto> {
    return this.openingsRepository.getECOs();
  }
}
