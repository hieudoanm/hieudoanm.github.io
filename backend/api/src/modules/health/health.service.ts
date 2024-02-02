import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './health.dto';

@Injectable()
export class HealthService {
  getHealth(): HealthResponseDto {
    return { status: 'OK' };
  }
}
