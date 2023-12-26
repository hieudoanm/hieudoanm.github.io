import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { VietnamModule } from './vietnam/vietnam.module';
import { CacheModule } from '@nestjs/cache-manager';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    OrganizationsModule,
    VietnamModule,
  ],
  controllers: [CountriesController],
  providers: [PrismaService, CountriesService],
})
export class CountriesModule {}
