import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsRepository } from './openings.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [OpeningsController],
  providers: [PrismaChessClient, OpeningsRepository],
})
export class OpeningsModule {}
