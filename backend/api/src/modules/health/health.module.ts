import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
