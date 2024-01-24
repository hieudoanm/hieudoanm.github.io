import {
  ONE_MONTH,
  ONE_QUARTER,
  ONE_WEEK,
  ONE_YEAR,
} from '@hieudoanm/common/constants/constants';

export type ChessPlayer = { id: string };

export type ChessTitle = 'GM';

export type ChessOpening = { eco: string };

export type ChessGame = { id: string };

export type CountryTotal = {
  countryCode: string;
  country: string;
  total: number;
};

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
  averageRapidRating: number;
  averageBlitzRating: number;
  averageBulletRating: number;
  maxRapidRating: number;
  maxBlitzRating: number;
  maxBulletRating: number;
  total: number;
  players: ChessPlayer[];
  titles: ChessTitle[];
};

export type GamesSynced = { total: number; synced: number; existed: number };

export type StreamersResponse = {
  total: number;
  players: ChessPlayer[];
  countries: { countryCode: string; country: string }[];
};

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

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
