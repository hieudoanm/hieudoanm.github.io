import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { FrankfurterClient } from '../../../../src/common/clients/frankfurter/frankfurter.client';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [ForexController],
  providers: [FrankfurterClient, ForexService],
})
export class ForexModule {}
