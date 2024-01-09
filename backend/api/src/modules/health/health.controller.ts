import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './health.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('health')
@Controller({ version: '1', path: 'health' })
@UseInterceptors(CacheInterceptor)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: HealthResponseDto,
    description: 'State of the Server',
  })
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth();
  }
}
