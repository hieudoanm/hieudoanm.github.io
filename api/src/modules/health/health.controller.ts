import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './health.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({ status: 200, type: HealthResponseDto })
  getHello(): HealthResponseDto {
    return this.healthService.getHealth();
  }
}
