import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [WordsController],
  providers: [PrismaPublicClient, WordsService],
})
export class WordsModule {}
