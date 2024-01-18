import { join } from 'path';
import { ChessModule } from '@hieudoanm/modules/chess/chess.module';
import { CountriesModule } from '@hieudoanm/modules/countries/countries.module';
import { FinanceModule } from '@hieudoanm/modules/finance/finance.module';
import { GitHubModule } from '@hieudoanm/modules/github/github.module';
import { HealthModule } from '@hieudoanm/modules/health/health.module';
import { NewsModule } from '@hieudoanm/modules/news/news.module';
import { TarotModule } from '@hieudoanm/modules/tarot/tarot.module';
import { WordsModule } from '@hieudoanm/modules/words/words.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';

const rootPath: string = join(__dirname, '..', 'public');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    ServeStaticModule.forRoot({ rootPath }),
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
