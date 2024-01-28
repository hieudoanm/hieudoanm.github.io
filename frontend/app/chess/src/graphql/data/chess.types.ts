import {
  ONE_MONTH,
  ONE_QUARTER,
  ONE_WEEK,
  ONE_YEAR,
} from '@chess/common/constants/time.constants';
import {
  ChessOpening,
  ChessPlayer,
  ChessStats,
  ChessTitle,
} from '@prisma/client';

export type Titled = {
  averageRapidRating: number;
  averageBlitzRating: number;
  averageBulletRating: number;
  maxRapidRating: number;
  maxBlitzRating: number;
  maxBulletRating: number;
  total: number;
  players: ChessPlayer[];
};

export type Country = {
  countryCode: string;
  country: string;
  total: number;
  averageRapidRating: number;
  averageBlitzRating: number;
  averageBulletRating: number;
  maxRapidRating: number;
  maxBlitzRating: number;
  maxBulletRating: number;
  players: ChessPlayer[];
  titles: ChessTitle[];
};

export type CountriesResponse = {
  countries: Country[];
};

export type GamesSynced = { total: number; synced: number; existed: number };

export type StreamersResponse = {
  total: number;
  players: ChessPlayer[];
  countries: { countryCode: string; country: string }[];
};

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export type OpeningsResponse = {
  total: number;
  openings: ChessOpening[];
};

export type Player = ChessStats & { player: ChessPlayer };

export type PlayersResponse = {
  players: Player[];
};

export const timeRangeInMilliseconds: Record<TimeRange, number> = {
  week: ONE_WEEK,
  month: ONE_MONTH,
  quarter: ONE_QUARTER,
  year: ONE_YEAR,
};

export const timeRangeInDays: Record<TimeRange, number> = {
  week: 7,
  month: 30,
  quarter: 90,
  year: 365,
};
