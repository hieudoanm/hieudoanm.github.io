import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
