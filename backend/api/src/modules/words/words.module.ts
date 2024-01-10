import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [WordsController],
  providers: [PrismaService, WordsService],
})
export class WordsModule {}
