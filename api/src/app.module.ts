import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './modules/countries/countries.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';
import { TarotModule } from './modules/tarot/tarot.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    HttpModule,
    CountriesModule,
    CryptoModule,
    HealthModule,
    NewsModule,
    TarotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
