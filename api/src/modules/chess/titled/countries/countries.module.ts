import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesRepository } from './countries.repository';
import { CountriesService } from './countries.service';

@Module({
  imports: [],
  controllers: [CountriesController],
  providers: [CountriesRepository, CountriesService],
})
export class CountriesModule {}
