import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusClient } from '@hieudoanm/common/clients/apis/status/status.client';

@Module({
  imports: [CacheModule.register()],
  controllers: [StatusController],
  providers: [StatusClient],
})
export class StatusModule {}
