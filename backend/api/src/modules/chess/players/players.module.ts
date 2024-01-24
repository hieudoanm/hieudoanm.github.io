import { ChessClient } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.client';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
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
  providers: [ChessClient, PrismaChessClient, PlayerService],
})
export class PlayerModule {}
