import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TarotController } from './tarot.controller';
import { TarotService } from './tarot.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TarotController],
  providers: [PrismaService, TarotService],
})
export class TarotModule {}
