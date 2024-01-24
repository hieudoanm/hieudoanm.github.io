import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { TitledController } from './titled.controller';
import { TitledRepository } from './titled.repository';
import { TitledService } from './titled.service';

@Module({
  imports: [CacheModule.register(), CountriesModule],
  controllers: [TitledController],
  providers: [PrismaPublicClient, TitledRepository, TitledService],
})
export class TitledModule {}
