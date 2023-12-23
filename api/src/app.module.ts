import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './modules/countries/countries.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CountriesModule,
    CryptoModule,
    HealthModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
