// K is the development coefficient.
// K = 40 for a player new to the rating list until he has completed events with at least 30 games
// K = 20 as long as a player's rating remains under 2400.
// K = 10 once a player's published rating has reached 2400 and remains at that level subsequently, even if the rating drops below 2400.
// K = 40 for all players until their 18th birthday, as long as their rating remains under 2300.
// K = 20 for RAPID and BLITZ ratings all players.

import { ChessPoint } from '@chess/common/enums/chess.enums';
import { logger } from '@chess/common/libs/logger';
import { ChessTimeClass } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export type DevelopmentCoefficient = 10 | 20 | 40;

export type RatingRequestBody = {
  rating: number;
  opponentRating: number;
  result?: ChessPoint;
  age?: number;
  games?: number;
  timeClass?: ChessTimeClass;
};

export type RatingResponse = {
  rating: number;
};

const getDevelopmentCoefficient = ({
  rating,
  age = 18,
  games = 31,
  timeClass = ChessTimeClass.classical,
}: RatingRequestBody): DevelopmentCoefficient => {
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
};

const getDelta = ({
  rating,
  opponentRating,
  age = 18,
  result = ChessPoint.DRAW,
}: RatingRequestBody): number => {
  if (![ChessPoint.WIN, ChessPoint.DRAW, ChessPoint.LOSS].includes(result))
    return 0;
  const gap: number = opponentRating - rating;
  const chanceToWin: number = 1 / (1 + 10 ** (gap / 400));
  const K: DevelopmentCoefficient = getDevelopmentCoefficient({
    rating,
    opponentRating,
    result,
    age,
  });
  logger.info(`getDelta K=${K}`);
  return Math.round(K * (result - chanceToWin));
};

export const calculateRating = ({
  rating,
  opponentRating,
  age = 18,
  games = 31,
  result = ChessPoint.DRAW,
  timeClass = 'classical',
}: RatingRequestBody) => {
  const delta = getDelta({
    rating,
    opponentRating,
    result,
    age,
    games,
    timeClass,
  });
  logger.info(`calculateRating delta=${delta}`);
  return rating + delta;
};
