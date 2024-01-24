import { FrankfurterClient } from '@hieudoanm/common/clients/apis/forex/frankfurter/frankfurter.client';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ForexController],
  providers: [FrankfurterClient, ForexService],
})
export class ForexModule {}
