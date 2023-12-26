import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../src/common/prisma/prisma.service';
import { TarotController } from './tarot.controller';
import { TarotService } from './tarot.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TarotController],
  providers: [PrismaService, TarotService],
})
export class TarotModule {}
