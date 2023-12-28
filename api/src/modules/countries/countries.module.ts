import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { LanguagesModule } from './languages/languages.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { VietnamModule } from './vietnam/vietnam.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    CurrenciesModule,
    LanguagesModule,
    OrganizationsModule,
    VietnamModule,
  ],
  controllers: [CountriesController],
  providers: [PrismaService, CountriesService],
})
export class CountriesModule {}
