import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CountriesModule,
    HealthModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
