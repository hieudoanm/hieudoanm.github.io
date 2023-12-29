// K is the development coefficient.
// K = 40 for a player new to the rating list until he has completed events with at least 30 games
// K = 20 as long as a player's rating remains under 2400.
// K = 10 once a player's published rating has reached 2400 and remains at that level subsequently, even if the rating drops below 2400.
// K = 40 for all players until their 18th birthday, as long as their rating remains under 2300.
// K = 20 for RAPID and BLITZ ratings all players.

import { Injectable } from '@nestjs/common';
import { ChessTimeClass } from '@prisma/client';
import { ChessPoint } from 'src/common/enums/chess.enums';

type DevelopmentCoefficient = 10 | 20 | 40;
type Options = { age: number; games: number; timeClass: ChessTimeClass };

@Injectable()
export class RatingService {
  private getDevelopmentCoefficient(
    rating: number,
    { age = 18, games = 31, timeClass = ChessTimeClass.classical }: Options
  ): DevelopmentCoefficient {
    if (
      timeClass === ChessTimeClass.rapid ||
      timeClass === ChessTimeClass.blitz
    ) {
      return 20;
    }
    if (games > 30) {
      return 40;
    }
    if (age < 18 && rating < 2300) {
      return 40;
    }
    if (rating >= 2400) {
      return 10;
    }
    return 20;
  }

  private getRatingDelta(
    rating: number,
    opponentRating: number,
    result: ChessPoint,
    options: Options
  ): number {
    if ([0, 0.5, 1].includes(result)) {
      return 0;
    }
    const gap: number = opponentRating - rating;
    const chanceToWin: number = 1 / (1 + Math.pow(10, gap / 400));
    const K: DevelopmentCoefficient = this.getDevelopmentCoefficient(
      rating,
      options
    );
    return Math.round(K * (result - chanceToWin));
  }

  public getNewRating(
    rating: number,
    opponentRating: number,
    result: ChessPoint,
    options: Options
  ) {
    return (
      rating + this.getRatingDelta(rating, opponentRating, result, options)
    );
  }
}
