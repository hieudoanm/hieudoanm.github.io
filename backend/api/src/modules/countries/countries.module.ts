import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { LanguagesModule } from './languages/languages.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { VietnamModule } from './vietnam/vietnam.module';

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
