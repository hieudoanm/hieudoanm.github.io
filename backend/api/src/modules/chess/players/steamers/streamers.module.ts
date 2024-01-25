import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersRepository } from './streamers.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamersController],
  providers: [PrismaChessClient, StreamersRepository],
})
export class StreamersModule {}
