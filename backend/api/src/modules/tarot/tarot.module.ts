import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TarotController } from './tarot.controller';
import { TarotService } from './tarot.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TarotController],
  providers: [PrismaPublicClient, TarotService],
})
export class TarotModule {}
