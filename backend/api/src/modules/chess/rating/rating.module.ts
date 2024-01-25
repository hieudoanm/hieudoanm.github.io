import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RatingService],
})
export class RatingModule {}
