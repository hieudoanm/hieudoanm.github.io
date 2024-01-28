import { ChessPlayer } from '@prisma/client';

export type TitlesDto = {
  total: number;
  titles: string[];
};

export type TitledStat = {
  average: number;
  max: number;
};

export type TitledStats = {
  rapid: TitledStat;
  blitz: TitledStat;
  bullet: TitledStat;
};

export type TitledStatsDto = {
  stats: TitledStats;
  total: number;
  players: ChessPlayer[];
};
