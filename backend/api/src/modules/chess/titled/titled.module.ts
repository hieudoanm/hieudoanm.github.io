import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { TitledController } from './titled.controller';
import { TitledRepository } from './titled.repository';
import { TitledService } from './titled.service';

@Module({
  imports: [CacheModule.register(), CountriesModule],
  controllers: [TitledController],
  providers: [PrismaChessClient, TitledRepository, TitledService],
})
export class TitledModule {}
