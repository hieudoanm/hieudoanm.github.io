import { Score, TimeClass } from '@chess/ts';

export type Formula = {
  ratingPlayer: number;
  ratingOpponent: number;
  ratingNew: number;
  score: Score;
  timeClass: TimeClass;
  lessThan30Games: boolean;
  overRating2400: boolean;
  overAge18: boolean;
};

export type GameRow = {
  ratingOpponent: number;
  score: Score;
};
