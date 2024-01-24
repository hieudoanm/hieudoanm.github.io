import { ChessClient } from '@hieudoanm/common/clients/apis/chess/chess.com/chess.client';
import { PrismaChessClient } from '@hieudoanm/common/prisma/chess/prisma.chess';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { AccuracyService } from './services/accuracy/accuracy.service';
import { GamesService } from './services/games/games.service';
import { OpponentsService } from './services/opponents/opponents.service';
import { DaysOfWeekService } from './services/results/helper/days-of-week.service';
import { TimeOfDaysService } from './services/results/helper/time-of-days.service';
import { ResultsService } from './services/results/results.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [InsightsController],
  providers: [
    ChessClient,
    TimeOfDaysService,
    DaysOfWeekService,
    PrismaChessClient,
    AccuracyService,
    GamesService,
    OpponentsService,
    ResultsService,
    InsightsService,
  ],
})
export class InsightsModule {}
