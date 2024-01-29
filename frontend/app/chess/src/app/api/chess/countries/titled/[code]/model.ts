import { ChessPlayer } from '@prisma/client';

export type Title = {
  title: string;
  total: number;
};

export type CountryStat = { average: number; max: number };

export type CountryStats = {
  rapid: CountryStat;
  blitz: CountryStat;
  bullet: CountryStat;
};

export type CountryResponse = {
  stats: CountryStats;
  total: number;
  titles: Title[];
  players: ChessPlayer[];
};
