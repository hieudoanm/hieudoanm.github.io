import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [HttpModule, HealthModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
