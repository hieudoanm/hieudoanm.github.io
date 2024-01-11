import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ChessClient } from '../../../common/clients/apis/chess/chess.com/chess.client';
import { PrismaService } from '../../../common/prisma/prisma.service';
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
  providers: [ChessClient, PrismaService, PlayerService],
})
export class PlayerModule {}
