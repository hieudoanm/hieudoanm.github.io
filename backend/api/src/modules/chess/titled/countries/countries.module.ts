import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CountriesController],
  providers: [PrismaChessClient, CountriesRepository, CountriesService],
})
export class CountriesModule {}
