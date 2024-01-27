import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CurrenciesController],
  providers: [PrismaPublicClient, CurrenciesService],
})
export class CurrenciesModule {}
