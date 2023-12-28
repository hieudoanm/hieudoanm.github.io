import { Module } from '@nestjs/common';
import { ChessClient } from '../../../common/clients/chess.com/chess.client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { GamesModule } from './games/games.module';
import { InsightsModule } from './insights/insights.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { StreamersModule } from './steamers/streamers.module';

@Module({
  imports: [GamesModule, InsightsModule, StreamersModule],
  controllers: [PlayerController],
  providers: [ChessClient, PrismaService, PlayerService],
})
export class PlayerModule {}
