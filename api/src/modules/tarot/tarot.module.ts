import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TarotController } from './tarot.controller';
import { TarotService } from './tarot.service';

@Module({
  imports: [],
  controllers: [TarotController],
  providers: [PrismaService, TarotService],
})
export class TarotModule {}
