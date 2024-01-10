import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CountriesController],
  providers: [PrismaService, CountriesRepository, CountriesService],
})
export class CountriesModule {}
