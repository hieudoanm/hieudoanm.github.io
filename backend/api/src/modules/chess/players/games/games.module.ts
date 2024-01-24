import { ChessClient } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.client';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TimeOfDaysService } from '../insights/services/results/helper/time-of-days.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [GamesController],
  providers: [GamesService, TimeOfDaysService, PrismaChessClient, ChessClient],
})
export class GamesModule {}
