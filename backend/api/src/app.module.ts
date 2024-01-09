import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChessModule } from './modules/chess/chess.module';
import { CountriesModule } from './modules/countries/countries.module';
import { FinanceModule } from './modules/finance/finance.module';
import { GitHubModule } from './modules/github/github.module';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';
import { TarotModule } from './modules/tarot/tarot.module';
import { WordsModule } from './modules/words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    HttpModule,
    ChessModule,
    CountriesModule,
    FinanceModule,
    GitHubModule,
    HealthModule,
    NewsModule,
    TarotModule,
    WordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
