import { Module } from '@nestjs/common';
import { ChessClient } from '../../../../common/clients/apis/chess.com/chess.client';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { TimeOfDaysService } from '../insights/services/results/helper/time-of-days.service';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService, TimeOfDaysService, PrismaService, ChessClient],
})
export class GamesModule {}
