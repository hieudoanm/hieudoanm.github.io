import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  EcosResponseDto,
  OpeningsRequestQueryResponseDto,
  OpeningsResponseDto,
} from './openings.dto';
import { OpeningsRepository } from './openings.repository';

@ApiTags('chess')
@Controller({ version: '1', path: 'chess/openings' })
@UseInterceptors(CacheInterceptor)
export class OpeningsController {
  constructor(private readonly openingsRepository: OpeningsRepository) {}

  @Get()
  @ApiQuery({
    name: 'eco',
    description: 'eco',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: 'offset',
    type: Number,
    required: false,
  })
  @ApiResponse({ status: 200, type: OpeningsResponseDto })
  public async getOpenings(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    {
      eco = '',
      name = '',
      limit = 100,
      offset = 0,
    }: OpeningsRequestQueryResponseDto
  ): Promise<OpeningsResponseDto> {
    return this.openingsRepository.getOpenings({ eco, name, limit, offset });
  }

  @Get('ecos')
  @ApiResponse({ status: 200, type: EcosResponseDto })
  public async getECOs(): Promise<EcosResponseDto> {
    return this.openingsRepository.getECOs();
  }
}
