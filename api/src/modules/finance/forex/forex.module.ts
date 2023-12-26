import { Module } from '@nestjs/common';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [ForexController],
  providers: [ForexService],
})
export class ForexModule {}
