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
  ChessTitleAbbreviation,
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

export type Stat = { rapid: number; blitz: number; bullet: number };

export type Stats = { average: Stat; max: Stat };

export type TitledCountry = {
  countryCode: string;
  country: string;
  count: number;
  total: number;
  stats: Stats;
  players: ChessPlayer[];
  titles: ChessTitleAbbreviation[];
};

export type CountriesResponse = {
  countries: TitledCountry[];
};

export type GamesSynced = { total: number; synced: number; existed: number };

export type StreamersResponse = {
  total: number;
  players: ChessPlayer[];
  countries: { countryCode: string; country: string }[];
};

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export type OpeningsOptions = {
  eco?: string;
  name?: string;
  limit?: number;
  offset?: number;
};

export type OpeningsResponse = {
  total: number;
  openings: ChessOpening[];
};

export type Player = ChessStats & { player: ChessPlayer };

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type CountryTotal = {
  countryCode: string;
  total: number;
};

export type PlayersResponse = {
  total: number;
  players: Player[];
  titles: TitleTotal[];
  countries: CountryTotal[];
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
