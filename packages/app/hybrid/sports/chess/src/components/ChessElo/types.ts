import { Score, TimeClass } from '@chess/ts';

export interface Formula {
  ratingPlayer: number;
  ratingOpponent: number;
  ratingNew: number;
  score: Score;
  timeClass: TimeClass;
  lessThan30Games: boolean;
  overRating2400: boolean;
  overAge18: boolean;
}

export interface GameRow {
  ratingOpponent: number;
  score: Score;
}
