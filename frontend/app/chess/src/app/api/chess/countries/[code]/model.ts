import { ChessPlayer } from '@prisma/client';

export type TitleDto = {
  title: string;
  total: number;
};

export type CountryResponse = {
  averageRapidRating: number;
  averageBlitzRating: number;
  averageBulletRating: number;
  maxRapidRating: number;
  maxBlitzRating: number;
  maxBulletRating: number;
  total: number;
  players: ChessPlayer[];
  titles: TitleDto[];
};
