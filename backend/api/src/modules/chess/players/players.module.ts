import { ChessClient } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.client';
import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { InsightsModule } from './insights/insights.module';
import { PlayerController } from './players.controller';
import { PlayerService } from './players.service';
import { StreamersModule } from './steamers/streamers.module';

@Module({
  imports: [
    CacheModule.register(),
    GamesModule,
    InsightsModule,
    StreamersModule,
  ],
  controllers: [PlayerController],
  providers: [ChessClient, PrismaPublicClient, PlayerService],
})
export class PlayerModule {}
