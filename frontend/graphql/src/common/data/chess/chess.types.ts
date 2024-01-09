import { ChessPlayer, ChessTitle } from '@prisma/client';
import {
  ONE_WEEK,
  ONE_MONTH,
  ONE_QUARTER,
  ONE_YEAR,
} from '../../constants/constants';

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

export type TimeRange = 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';

export const timeRangeInMilliseconds: Record<TimeRange, number> = {
  WEEK: ONE_WEEK,
  MONTH: ONE_MONTH,
  QUARTER: ONE_QUARTER,
  YEAR: ONE_YEAR,
};

export const timeRangeInDays: Record<TimeRange, number> = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
};
