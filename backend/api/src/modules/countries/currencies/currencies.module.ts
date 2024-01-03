import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CurrenciesController],
  providers: [PrismaService, CurrenciesService],
})
export class CurrenciesModule {}
