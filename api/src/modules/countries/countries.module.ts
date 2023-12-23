import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { VietnamModule } from './vietnam/vietnam.module';

@Module({
  imports: [HttpModule, VietnamModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
