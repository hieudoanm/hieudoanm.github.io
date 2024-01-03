import { Module } from '@nestjs/common';
import { EngineModule } from './engine/engine.module';
import { PlayerModule } from './player/player.module';
import { RatingModule } from './rating/rating.module';
import { TitledModule } from './titled/titled.module';

@Module({
  imports: [EngineModule, PlayerModule, RatingModule, TitledModule],
})
export class ChessModule {}
