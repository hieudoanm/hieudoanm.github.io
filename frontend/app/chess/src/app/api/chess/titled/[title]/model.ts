import { ChessPlayer } from '@prisma/client';

export type TitlesDto = {
  total: number;
  titles: string[];
};

export type TitledStatsDto = {
  averageRapidRating: number;
  maxRapidRating: number;
  averageBlitzRating: number;
  maxBlitzRating: number;
  averageBulletRating: number;
  maxBulletRating: number;
  total: number;
  players: ChessPlayer[];
};
